/*

    INOFFICIAL DLIVE.TV API LIB

    Use at your own risk.

 */


var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var events = require('events');
var dliveEmitter = new events.EventEmitter();

module.exports = {
    socket: WebSocketClient,
    client: client,
    events: events,
    dliveEmitter: dliveEmitter
};