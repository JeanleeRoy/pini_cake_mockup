const baseUrl =  'http://127.0.0.1:3000'
const queryUrl = '/api/insta-media';

const $gallery = document.getElementById('insta-gallery');
const $template = document.getElementById('image-template').content;
const $fragment = document.createDocumentFragment();

const svgPath = {
    video : "M9.6 46.5c-1 0-2-.3-2.9-.8-1.8-1.1-2.9-2.9-2.9-5.1V7.3c0-2.1 1.1-4 2.9-5.1 1.9-1.1 4.1-1.1 5.9 0l30.1 17.6c1.5.9 2.3 2.4 2.3 4.1 0 1.7-.9 3.2-2.3 4.1L12.6 45.7c-.9.5-2 .8-3 .8z",
    album : "M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"
}

const getInstagramMedia = () => {
    fetch(baseUrl + queryUrl)
        .then(res => res.json())
        .then(data => {
            showMedia(data.slice(0, 6));
        })
        .catch(err => {
            console.log(err);
        })
}

const showMedia = (data) => {
    data.forEach(media => {
        $template.querySelector(".insta--image").alt = media.media_type;
        $template.querySelector(".insta--box").setAttribute("href", media.permalink)
        if (media.media_type === 'VIDEO') {
            $template.querySelector("svg").setAttribute("height", 18);
            $template.querySelector("svg").setAttribute("width", 18);
            $template.querySelector(".insta--image").src = media.thumbnail_url;
            $template.querySelector(".path-svg").setAttribute("d", svgPath.video);
        } else if (media.media_type === 'CAROUSEL_ALBUM') {
            $template.querySelector(".insta--image").src = media.media_url;
            $template.querySelector(".path-svg").setAttribute("d", svgPath.album);
        } else {
            $template.querySelector(".insta--image").src = media.media_url;
            $template.querySelector(".path-svg").setAttribute("d", "");
        }
        let clone = document.importNode($template, true);
        $fragment.appendChild(clone);
    });
    $gallery.appendChild($fragment);
}

window.addEventListener('load',
    function () {
        getInstagramMedia();
    }, false);