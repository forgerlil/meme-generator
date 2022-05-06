import axios from 'axios'

function fetchData () {
  axios.get(`https://api.imgflip.com/get_memes`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
}

export default fetchData