module.exports = class WebRequest {

    constructor(authKey, postData) {
        this.https = require('https');

        let body, req = this.https.request({
            hostname: 'graphigo.prd.dlive.tv',
            port: 443,
            path: '/',
            method: 'POST',
            headers: {
                accept: '*/*',
                authorization: authKey,
                'content-type': 'application/json',
                fingerprint: '',
                gacid: 'undefined',
                Origin: 'https://dlive.tv',
                Referer: 'https://dlive.tv/creativebuilds',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
            }
        }, res => {
            res.on('data', chunk => {
                body += chunk;
            });
        });
        req.write(postData);
        req.end();
    }
};