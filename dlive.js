/*

    INOFFICIAL DLIVE.TV API LIB

    Use at your own risk.

 */

const EventEmitter = require('events');

class dlive extends EventEmitter {

    constructor() {
        super();
        this.authkey = '';
        this.channel = '';
        this.https = require('https');
        this.websocketclient = require('websocket').client;
        this.client = new this.websocketclient();
        this.request = require('./webrequest');
    }


    get getAuthkey() {
        return this.authkey;
    }

    get getChannel() {
        return this.channel;
    }

    set setAuthkey(authkey) {
        this.authkey = authkey;
    }

    set setChannel(channel) {
        this.channel = channel;
    }
    
};

module.exports = dlive;