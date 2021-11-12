const baseUrl =  'https://pinicake-server.herokuapp.com';//'http://127.0.0.1:3000'
const queryUrl = '/api/insta-media';

const getInstagramMedia = () => {
    fetch(baseUrl + queryUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}

window.addEventListener('load',
    function () {
        getInstagramMedia();
    }, false);