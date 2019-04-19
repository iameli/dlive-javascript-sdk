/*

    INOFFICIAL DLIVE.TV API LIB

    Use at your own risk.

 */

import EventEmitter from 'events'
import Https from 'https'
import Websocket from 'websocket'
import Webrequest from './webrequest'

export default class dlive extends EventEmitter {
  constructor () {
    super()
    this.authkey = ''
    this.channel = ''
    this.https = Https
    this.WebsocketClient = Websocket.client
    this.client = new this.WebsocketClient()
    this.Request = Webrequest
  }

  get getAuthkey () {
    return this.authkey
  }

  get getChannel () {
    return this.channel
  }

  set setAuthkey (authkey) {
    this.authkey = authkey
  }

  set setChannel (channel) {
    this.channel = channel
  }
}
