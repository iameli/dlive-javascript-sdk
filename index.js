const dliveInit = require('./dliveInit');

class dliver extends dliveInit {
    constructor (channel, authKey) {
        super (channel, authKey);
        this.initalized = true;
    }

    sendMessage(message) {
        if (!this.initalized) return throw new Error("You have to create a class instance first!");
        this.sendChatMessage(message);
    }

    sendMessageToChannel(channel, message) {
        if (!this.initalized) return throw new Error("You have to create a class instance first!");
        this.sendMessageToChannelChat(channel, message);
    }

    getChannelInformations(displayname, callback) {
        if (!this.initalized) return throw new Error("You have to create a class instance first!");
        this.getChannelInformation(displayname, (result) => {
            callback(result);
        });
    }

}

module.exports = dliver;