const dliveInit = require('./dliveInit');

class dliver extends dliveInit {
    constructor(channel, authKey) {
        super(channel, authKey);
        this.initalized = true;
    }

    sendMessage(message) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.sendChatMessage(message);
    }

    sendMessageToChannel(channel, message) {
        if (!this.initalized) return new Error("You have to create a class instance first!");
        this.sendMessageToChannelChat(channel, message);
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

}

module.exports = dliver;
