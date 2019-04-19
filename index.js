import DliveInit from './dliveInit'

export default class Dliver extends DliveInit {
  constructor (channel, authKey) {
    super(channel, authKey)
    this.initalized = true
  }

  sendMessage (message) {
    if (!this.initalized) return new Error('You have to create a class instance first!')
    return new Promise((resolve, reject) => {
      this.sendChatMessage(message).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  sendMessageToChannel (channel, message) {
    if (!this.initalized) return new Error('You have to create a class instance first!')
    return new Promise((resolve, reject) => {
      this.sendMessageToChannelChat(channel, message).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getChannelInformation (displayname) {
    if (!this.initalized) return new Error('You have to create a class instance first!')
    return new Promise((resolve, reject) => {
      this.getChannelInformationByDisplayName(displayname).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getChannelTopContributors (displayname, amountToShow, rule) {
    if (!this.initalized) return new Error('You have to create a class instance first!')
    return new Promise((resolve, reject) => {
      this.getChannelTopContributorsByDisplayName(displayname, amountToShow, rule).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getGlobalInformation () {
    if (!this.initalized) return new Error('You have to create a class instance first!')
    return new Promise((resolve, reject) => {
      this.getDliveGlobalInformation().then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
