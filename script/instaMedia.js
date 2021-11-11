// API Docs: https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media
// See Basic Instagram display: Testers [fb developer app]

const baseUrl = 'https://graph.instagram.com/';
const userToken = 'IGQVJYMWFCTFZA6TlpnSXFwbXlONzFzMzQyc0pyNGxsNlhJZAzE4elFDYUhqREVJSUp0ZA0lKNlhzOWowdUtETmd2T2g3VTJDWjBhcWU3a0docnlxN1cyRTFmbW1yaXV3bnJUS1ZAIY1ZAkVGs1aWZAvYXRidAZDZD';
const queryUrl = `me/media?id,caption,media_url,media_type,permalink&access_token=${userToken}`;

const getInstagramMedia = () => {
    fetch(baseUrl + queryUrl, {
        mode: 'cors'
    })
    //.then(res => res.json())
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