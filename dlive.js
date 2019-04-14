/*

    INOFFICIAL DLIVE.TV API LIB

    Use at your own risk.

 */

module.exports = class dlive {

    constructor() {
        this.authkey = '';
        this.channel = '';

        this.dliveInit = require('./dliveInit');
        this.https = require('https');
        this.event = require('events').EventEmitter;
        this.events = new this.event();
        this.websocketclient = require('websocket').client;
        this.client = new this.websocketclient();
        this.init = null;
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

    get getClient() {
        return this.client;
    }

    doInit(channel, authkey) {
        if (this.init === null) {
            this.init = new this.dliveInit(this, channel, authkey);
            return this.init;
        } else {
            return this.init;
        }
    }

    sendMessage(message) {
        if (this.init === null) {
            return console.log('You have to create an instance first!');
        }
        this.init.sendMessage(message);
    }

    getChannelInformations(displayname, callback) {
        if (this.init === null) {
            return console.log('You have to create an instance first!');
        }
        this.init.getChannelInformations(displayname, (result) => {
            callback(result);
        });
    }

    get getEvents() {
        return this.events;
    }

    get getHTTPS() {
        return this.https;
    }

    get getRequest() {
        return this.request;
    }

};
