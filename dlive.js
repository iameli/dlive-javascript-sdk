/*

    INOFFICIAL DLIVE.TV API LIB

    Use at your own risk.

 */

module.exports = class dlive {

    constructor() {
        this.authkey = '';
        this.channel = '';

        this.dliveInit = require('./dliveInit');
        this.event = require('events').EventEmitter;
        this.events = new this.event();
        this.websocketclient = require('websocket').client;
        this.client = new this.websocketclient();
    }


    get getAuthkey() {
        return this.authkey;
    }

    get getChannel() {
        return this.channel;
    }

    set setAuthkey(authkey) {
        //console.log('set authkey...');
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

    doInit(channel, authkey) {
        return new this.dliveInit(channel, authkey);
    }

    get getEvents() {
        return this.events;
    }

};