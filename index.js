const dliveInit = require('./dliveInit');

class dliver extends dliveInit {

    constructor(channel, authKey) {
        super(channel, authKey);
        this.initalized = true;
    }

    sendMessage(message, callback) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.sendChatMessage(message, callback);
    }

    sendMessageToChannel(channel, message, callback) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.sendMessageToChannelChat(channel, message, callback);
    }

    getChannelInformation(displayname, callback) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.getChannelInformationByDisplayName(displayname, (result) => {
            callback(result);
        });
    }

    getChannelTopContributors(displayname, amountToShow, rule, callback) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.getChannelTopContributorsByDisplayName(displayname, amountToShow, rule, (result) => {
            callback(result);
        });
    }

    getGlobalInformation(callback) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.getDliveGlobalInformation((result) => {
            callback(result);
        });
    }

}

module.exports = dliver;
