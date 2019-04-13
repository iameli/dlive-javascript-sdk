/*

    INOFFICIAL DLIVE.TV API LIB

    Use at your own risk.

 */


const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();
const dliveInit = require('./dliveInit');
const events = require('events').EventEmitter;


global.dlive_Client = client;
global.dlive_Event = new events();
global.dlive_Init = dliveInit;