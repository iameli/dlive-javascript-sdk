require('./dlive.js');

module.exports = class dliveInit {

    connect(username) {
        dlive_Client.on('connectFailed', function (error) {
            console.log('Connect Error: ' + error.toString());
        });

        dlive_Client.on('connect', function (connection) {
            connection.sendUTF(
                JSON.stringify({
                    type: 'connection_init',
                    payload: {}
                })
            );
            connection.sendUTF(
                JSON.stringify({
                    id: '1',
                    type: 'start',
                    payload: {
                        variables: {
                            streamer: username
                        },
                        extensions: {},
                        operationName: 'StreamMessageSubscription',
                        query:
                            'subscription StreamMessageSubscription($streamer: String!) {\n  streamMessageReceived(streamer: $streamer) {\n    type\n    ... on ChatGift {\n      id\n      gift\n      amount\n      recentCount\n      expireDuration\n      ...VStreamChatSenderInfoFrag\n    }\n    ... on ChatHost {\n      id\n      viewer\n      ...VStreamChatSenderInfoFrag\n    }\n    ... on ChatSubscription {\n      id\n      month\n      ...VStreamChatSenderInfoFrag\n    }\n    ... on ChatChangeMode {\n      mode\n    }\n    ... on ChatText {\n      id\n      content\n      ...VStreamChatSenderInfoFrag\n    }\n    ... on ChatFollow {\n      id\n      ...VStreamChatSenderInfoFrag\n    }\n    ... on ChatDelete {\n      ids\n    }\n    ... on ChatBan {\n      id\n      ...VStreamChatSenderInfoFrag\n    }\n    ... on ChatModerator {\n      id\n      ...VStreamChatSenderInfoFrag\n      add\n    }\n    ... on ChatEmoteAdd {\n      id\n      ...VStreamChatSenderInfoFrag\n      emote\n    }\n  }\n}\n\nfragment VStreamChatSenderInfoFrag on SenderInfo {\n  subscribing\n  role\n  roomRole\n  sender {\n    id\n    username\n    displayname\n    avatar\n    partnerStatus\n  }\n}\n'
                    }
                })
            );

            connection.on('error', function (error) {
                console.log("Connection Error: " + error.toString());
            });
            connection.on('close', function () {
                console.log('Connection Closed');
            });
            connection.on('message', function (message) {
                if (!message || message === null || message === undefined) return;

                if (message.type === 'ka' || message.type === 'connection_ack') return;
                if (message.type === 'utf8') {
                    message = JSON.parse(message.utf8Data);

                    if (message.payload !== undefined) {

                        let remMessage = message.payload.data.streamMessageReceived['0'];
                        if (remMessage.__typename === 'ChatText') {
                            dlive_Event.emit('ChatText', remMessage);
                        } else if (remMessage.__typename === 'ChatGift') {
                            dlive_Event.emit('ChatGift', remMessage);
                        } else if (remMessage.__typename === 'ChatFollow') {
                            dlive_Event.emit('ChatFollow', remMessage);
                        } else {
                            console.log(`Not handled type: '${remMessage.__typename}'`);
                        }
                    }
                }
            });
        });

        dlive_Client.connect('wss://graphigostream.prd.dlive.tv', 'graphql-ws');
    }

}