import './App.css';
import { useState, useEffect } from 'react'
import imgFetch from './APIs/meme-img-fetch'

function App() {
  const [ memeImgs, setMemeImgs ] = useState(false);
  const [ firstText, setFirstText ] = useState('');
  const [ secondText, setSecondText ] = useState('');
  const [ currentMeme, setCurrentMeme ] = useState(false)

  const randomMeme = () => Math.floor(Math.random()* 100);

  const goBack = () => {
    setCurrentMeme(prev => prev - 1)
  }

  const goNext = () => {
    setCurrentMeme(prev => prev + 1)
  }

  const goRandom = () => {
    setCurrentMeme(randomMeme())
  }

  const topText = (e) => {
    setFirstText(e.target.value)
  }

  const bottomText = (e) => {
    setSecondText(e.target.value)
  }

  //Learning here: Run the fetch first, then assign the returned object in the variable state!
  //  If assigning the fetch to the variable (setVariable(fetch...)), you're storing a PROMISE
  //  in the variable and not the result!
  useEffect(() => {
  // When passing a function as a parameter for another function, don't call the function when passing
  // function(parameterFunc) and NOT function(parameterFunc())
    imgFetch(setMemeImgs);
    setCurrentMeme(randomMeme())
  }, [])

  return (
    memeImgs &&
    <div className="app">
      <div className="meme-wrapper">
        <p className="top-text">{firstText}</p>
        <p className="bottom-text">{secondText}</p>
        <img className="meme-img" src={memeImgs[currentMeme].url} alt={memeImgs[currentMeme].name} />
      </div>
      <div className="wrapper">
        <h3>{currentMeme + 1}. {memeImgs[currentMeme].name}</h3>
        <div className="input=wrapper">
          <label htmlFor="top-text-input">Top text</label>
          <input className="" type="text" name="top-text" id="top-text-input" onChange={topText} />
          <label htmlFor="bottom-text-input">Bottom text</label>
          <input className="" type="text" name="bottom-text" id="bottom-text-input" onChange={bottomText} />
        </div>
        <div className="buttons-wrapper">
          <button disabled={currentMeme <= 0} onClick={goBack}>Previous Meme</button>
          <button onClick={goRandom}>Random Meme</button>
          <button disabled={currentMeme >= 99} onClick={goNext}>Next Meme</button>
      </div>
      </div>
    </div>
  );
}

export default App;
