// controller.js
// Logic behind the functionalities
const axios = require('axios').default

const baseUrl = 'https://graph.instagram.com';
const userToken = 'IGQVJYMWFCTFZA6TlpnSXFwbXlONzFzMzQyc0pyNGxsNlhJZAzE4elFDYUhqREVJSUp0ZA0lKNlhzOWowdUtETmd2T2g3VTJDWjBhcWU3a0docnlxN1cyRTFmbW1yaXV3bnJUS1ZAIY1ZAkVGs1aWZAvYXRidAZDZD';

const handleError = (error, callback) => {
    callback({
        message: error.message || 'Unexpected error',
        code: error.code || error.status || 400
    })
}

class Controller {
    // getting all instagram media
    getMedia(callback, errCallback) {
        axios.get(baseUrl + '/me/media/', {
            params: {
                fields: 'id,caption,media_url,media_type,permalink',
                access_token: userToken
            }
        }).then(res => {
            if (callback != null) callback(res.data);
        }).catch(err => {
            if (errCallback != null) handleError(err, errCallback);
        })
    }

    getMediaById(mediaId, callback, errCallback) {
        axios.get(baseUrl + `/${mediaId}`, {
            params: {
                fields: 'id,caption,media_url,media_type,permalink,thumbnail_url',
                access_token: userToken
            }
        }).then(res => {
            if (callback != null) callback(res);
        }).catch(err => {
            if (errCallback != null) handleError(err, errCallback);
        })
    }

}

module.exports = Controller;