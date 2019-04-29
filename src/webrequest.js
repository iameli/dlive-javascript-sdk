'use strict'

const https = require('https')

function generateOptions (authKey) {
  let options = {
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
  }
  return options
}

const webRequest = (authKey, postData) => {
  return new Promise((resolve) => {
    let options = generateOptions(authKey)
    let req = https.request(options, (res) => {
      res.setEncoding('utf-8')
      res.on('data', (chunk) => {
        resolve(chunk)
      })
    })
    req.write(postData)
    req.end()
  })
}

module.exports = {
  webRequest
}
