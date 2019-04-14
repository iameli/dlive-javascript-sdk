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
        new this.main.request(this.main.getAuthkey, postData, (result) => {});
    };

    getChannelInformations(displayName, callback) {
        let postData = JSON.stringify({
            "operationName": "LivestreamPage",
            "variables": {
                "displayname": displayName,
                "add": false,
                "isLoggedIn": true
            },
            "query": "query LivestreamPage($displayname: String!, $add: Boolean!, $isLoggedIn: Boolean!) {\n  userByDisplayName(displayname: $displayname) {\n    id\n    ...VDliveAvatarFrag\n    ...VDliveNameFrag\n    ...VFollowFrag\n    ...VSubscriptionFrag\n    banStatus\n    about\n    avatar\n    myRoomRole @include(if: $isLoggedIn)\n    isMe @include(if: $isLoggedIn)\n    isSubscribing @include(if: $isLoggedIn)\n    livestream {\n      id\n      permlink\n      watchTime(add: $add)\n      ...LivestreamInfoFrag\n      ...VVideoPlayerFrag\n      __typename\n    }\n    hostingLivestream {\n      id\n      creator {\n        ...VDliveAvatarFrag\n        displayname\n        username\n        __typename\n      }\n      ...VVideoPlayerFrag\n      __typename\n    }\n    ...LivestreamProfileFrag\n    __typename\n  }\n}\n\nfragment LivestreamInfoFrag on Livestream {\n  category {\n    title\n    imgUrl\n    id\n    backendID\n    __typename\n  }\n  title\n  watchingCount\n  totalReward\n  ...VDonationGiftFrag\n  ...VPostInfoShareFrag\n  __typename\n}\n\nfragment VDonationGiftFrag on Post {\n  permlink\n  creator {\n    username\n    __typename\n  }\n  __typename\n}\n\nfragment VPostInfoShareFrag on Post {\n  permlink\n  title\n  content\n  category {\n    id\n    backendID\n    title\n    __typename\n  }\n  __typename\n}\n\nfragment VDliveAvatarFrag on User {\n  avatar\n  __typename\n}\n\nfragment VDliveNameFrag on User {\n  displayname\n  partnerStatus\n  __typename\n}\n\nfragment LivestreamProfileFrag on User {\n  isMe @include(if: $isLoggedIn)\n  canSubscribe\n  private @include(if: $isLoggedIn) {\n    subscribers {\n      totalCount\n      __typename\n    }\n    __typename\n  }\n  videos {\n    totalCount\n    __typename\n  }\n  pastBroadcasts {\n    totalCount\n    __typename\n  }\n  followers {\n    totalCount\n    __typename\n  }\n  following {\n    totalCount\n    __typename\n  }\n  ...ProfileAboutFrag\n  __typename\n}\n\nfragment ProfileAboutFrag on User {\n  id\n  about\n  __typename\n}\n\nfragment VVideoPlayerFrag on Livestream {\n  disableAlert\n  category {\n    id\n    title\n    __typename\n  }\n  language {\n    language\n    __typename\n  }\n  __typename\n}\n\nfragment VFollowFrag on User {\n  id\n  username\n  displayname\n  isFollowing @include(if: $isLoggedIn)\n  isMe @include(if: $isLoggedIn)\n  followers {\n    totalCount\n    __typename\n  }\n  __typename\n}\n\nfragment VSubscriptionFrag on User {\n  id\n  username\n  displayname\n  isSubscribing @include(if: $isLoggedIn)\n  canSubscribe\n  isMe @include(if: $isLoggedIn)\n  __typename\n}\n"
        });
        new this.main.request(this.main.getAuthkey, postData, (result) => {
            result = JSON.parse(result);
            callback(result.data.userByDisplayName);
        });
    };

};