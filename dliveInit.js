module.exports = class dliveInit {

    constructor(main, channel, authkey) {
        this.main = main;
        this.main.setChannel = channel;
        this.main.setAuthkey = authkey;
        this.main.getClient.on('connectFailed', function (error) {
            console.log('Connect Error: ' + error.toString());
        });

        this.main.getClient.on('connect', function (connection) {
            console.log(`Joining ${main.getChannel}`);
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
                            streamer: channel
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
                            main.getEvents.emit('ChatText', remMessage);
                        } else if (remMessage.__typename === 'ChatGift') {
                            main.getEvents.emit('ChatGift', remMessage);
                        } else if (remMessage.__typename === 'ChatFollow') {
                            main.getEvents.emit('ChatFollow', remMessage);
                        } else if(remMessage.__typename === 'ChatDelete') {
                            main.getEvents.emit('ChatDelete', remMessage);
                        } else {
                            console.log(`Not handled type: '${remMessage.__typename}'`);
                        }
                    }
                }
            });
        });

        main.getClient.connect('wss://graphigostream.prd.dlive.tv', 'graphql-ws');
    }

    sendMessage(message) {
        let postData = JSON.stringify({
            operationName: 'SendStreamChatMessage',
            query: `mutation SendStreamChatMessage($input: SendStreamchatMessageInput!) {
                sendStreamchatMessage(input: $input) {
                  err {
                    code
                    __typename
                  }
                  message {
                    type
                    ... on ChatText {
                      id
                      content
                      ...VStreamChatSenderInfoFrag
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
              }
              
              fragment VStreamChatSenderInfoFrag on SenderInfo {
                subscribing
                role
                roomRole
                sender {
                  id
                  username
                  displayname
                  avatar
                  partnerStatus
                  __typename
                }
                __typename
              }
              `,
            variables: {
                input: {
                    streamer: this.main.getChannel,
                    message: message,
                    roomRole: 'Moderator',
                    subscribing: true
                }
            }
        });
        new this.main.request(this.main.getAuthkey, postData);
    };
}