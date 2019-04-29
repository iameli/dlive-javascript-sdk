'use strict'

const {
  dliveInit
} = require('./dliveInit')

class Dliver extends dliveInit {
  // eslint-disable-next-line no-useless-constructor
  constructor (channel, authKey) {
    super(channel, authKey)
  }

  sendMessage (message) {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.sendChatMessage(message).then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }

  sendMessageToChannel (channel, message) {
    if (!channel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.sendMessageToChannelChat(channel, message).then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }

  getChannelInformation (displayName) {
    if (!displayName) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getChannelInformationByDisplayName(displayName).then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }

  getChannelTopContributors (displayName, amountToShow = 5, rule = 'THIS_STREAM') {
    if (!displayName) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getChannelTopContributorsByDisplayName(displayName, amountToShow, rule).then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }

  getGlobalInformation () {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getDliveGlobalInformation().then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }

  getChannelViewers (displayName) {
    return new Promise((resolve, reject) => {
      this.getChannelViewersByDisplayName(displayName).then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }

  getChannelFollowers (displayName, limit = 20) {
    return new Promise((resolve, reject) => {
      this.getChannelFollowersByDisplayName(displayName, limit).then((result) => {
        resolve(result)
      }).catch(reject)
    })
  }
}

module.exports = {
  Dlive: Dliver
}
