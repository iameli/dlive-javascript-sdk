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
        //console.log('set channel...');
        this.channel = channel;
    }

    get getWebsocketclient() {
        return this.websocketclient;
    }

    get getClient() {
        return this.client;
    }

    doInit(main, channel, authkey) {
        if(this.init === null) {
            this.init = new this.dliveInit(main, channel, authkey);
            return this.init;
        } else {
            return this.init;
        }
    }

    sendMessage(message) {
        if(this.init === null) {
            return console.log('You have to create an instance first!');
        }

        this.init.sendMessage(message);
    }

    get getEvents() {
        return this.events;
    }

    get getHTTPS() {
        return this.https;
    }

};