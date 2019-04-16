const dlive = require('./dlive');

class dliveInit extends dlive {

    constructor(channel, authkey) {
        super();
        let _this = this;
        _this.setChannel = channel;
        _this.setAuthkey = authkey;
        _this.client.on('connectFailed', function (error) {
            throw new Error(`Connect error: ${error.toString()}`);
        });

        _this.client.on('connect', function (connection) {
            console.log(`Joining ${_this.getChannel}`);
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
                throw new Error(`Connection error: ${error.toString()}`);
            });
            connection.on('close', function () {
                throw new Error('Connection closed');
            });
            connection.on('message', function (message) {
                if (!message || message === null || message === undefined) return;

                if (message.type === 'ka' || message.type === 'connection_ack') return;
                if (message.type === 'utf8') {
                    message = JSON.parse(message.utf8Data);

                    if (message.payload !== undefined) {

                        let remMessage = message.payload.data.streamMessageReceived['0'];
                        if (remMessage.__typename === 'ChatText') {
                            _this.emit('ChatText', remMessage);
                        } else if (remMessage.__typename === 'ChatGift') {
                            _this.emit('ChatGift', remMessage);
                        } else if (remMessage.__typename === 'ChatFollow') {
                            _this.emit('ChatFollow', remMessage);
                        } else if (remMessage.__typename === 'ChatDelete') {
                            _this.emit('ChatDelete', remMessage);
                        } else if (remMessage.__typename === 'ChatOffline') {
                            _this.emit('ChatOffline', remMessage);
                        } else if (remMessage.__typename === 'ChatLive') {
                            _this.emit('ChatLive', remMessage);
                        } else {
                            throw new Error(`Not handled type: '${remMessage.__typename}'`);
                        }
                    }
                }
            });
        });

        _this.client.connect('wss://graphigostream.prd.dlive.tv', 'graphql-ws');
    }

    sendChatMessage(message) {
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
                    streamer: this.getChannel,
                    message: message,
                    roomRole: 'Moderator',
                    subscribing: true
                }
            }
        });
        new this.request(this.getAuthkey, postData, (result) => {
            result = JSON.parse(result);
            if (result.errors !== undefined) {
                throw new Error(result.errors['0'].message);
            }
        });
    };

    sendMessageToChannelChat(channel, message) {
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
                    streamer: channel,
                    message: message,
                    roomRole: 'Moderator',
                    subscribing: true
                }
            }
        });
        new this.request(this.getAuthkey, postData, (result) => {
            result = JSON.parse(result);
            if (result.errors !== undefined) {
                throw new Error(result.errors['0'].message);
            }
        });
    };

    getChannelInformationByDisplayName(displayName, callback) {
        let postData = JSON.stringify({
            "operationName": "LivestreamPage",
            "variables": {
                "displayname": displayName,
                "add": false,
                "isLoggedIn": true
            },
            "query": "query LivestreamPage($displayname: String!, $add: Boolean!, $isLoggedIn: Boolean!) {\n  userByDisplayName(displayname: $displayname) {\n    id\n    ...VDliveAvatarFrag\n    ...VDliveNameFrag\n    ...VFollowFrag\n    ...VSubscriptionFrag\n    banStatus\n    about\n    avatar\n    myRoomRole @include(if: $isLoggedIn)\n    isMe @include(if: $isLoggedIn)\n    isSubscribing @include(if: $isLoggedIn)\n    livestream {\n      id\n      permlink\n      watchTime(add: $add)\n      ...LivestreamInfoFrag\n      ...VVideoPlayerFrag\n      __typename\n    }\n    hostingLivestream {\n      id\n      creator {\n        ...VDliveAvatarFrag\n        displayname\n        username\n        __typename\n      }\n      ...VVideoPlayerFrag\n      __typename\n    }\n    ...LivestreamProfileFrag\n    __typename\n  }\n}\n\nfragment LivestreamInfoFrag on Livestream {\n  category {\n    title\n    imgUrl\n    id\n    backendID\n    __typename\n  }\n  title\n  watchingCount\n  totalReward\n  ...VDonationGiftFrag\n  ...VPostInfoShareFrag\n  __typename\n}\n\nfragment VDonationGiftFrag on Post {\n  permlink\n  creator {\n    username\n    __typename\n  }\n  __typename\n}\n\nfragment VPostInfoShareFrag on Post {\n  permlink\n  title\n  content\n  category {\n    id\n    backendID\n    title\n    __typename\n  }\n  __typename\n}\n\nfragment VDliveAvatarFrag on User {\n  avatar\n  __typename\n}\n\nfragment VDliveNameFrag on User {\n  displayname\n  partnerStatus\n  __typename\n}\n\nfragment LivestreamProfileFrag on User {\n  isMe @include(if: $isLoggedIn)\n  canSubscribe\n  private @include(if: $isLoggedIn) {\n    subscribers {\n      totalCount\n      __typename\n    }\n    __typename\n  }\n  videos {\n    totalCount\n    __typename\n  }\n  pastBroadcasts {\n    totalCount\n    __typename\n  }\n  followers {\n    totalCount\n    __typename\n  }\n  following {\n    totalCount\n    __typename\n  }\n  ...ProfileAboutFrag\n  __typename\n}\n\nfragment ProfileAboutFrag on User {\n  id\n  about\n  __typename\n}\n\nfragment VVideoPlayerFrag on Livestream {\n  disableAlert\n  category {\n    id\n    title\n    __typename\n  }\n  language {\n    language\n    __typename\n  }\n  __typename\n}\n\nfragment VFollowFrag on User {\n  id\n  username\n  displayname\n  isFollowing @include(if: $isLoggedIn)\n  isMe @include(if: $isLoggedIn)\n  followers {\n    totalCount\n    __typename\n  }\n  __typename\n}\n\nfragment VSubscriptionFrag on User {\n  id\n  username\n  displayname\n  isSubscribing @include(if: $isLoggedIn)\n  canSubscribe\n  isMe @include(if: $isLoggedIn)\n  __typename\n}\n"
        });
        new this.request(this.getAuthkey, postData, (result) => {
            result = JSON.parse(result);
            if (result.errors !== undefined) {
                throw new Error(result.errors['0'].message);
            }

            callback(result.data.userByDisplayName);
        });
    };

    getDliveGlobalInformation(callback) {
        let postData = JSON.stringify({
            "operationName": "GlobalInformation",
            "variables": {},
            "query": "query GlobalInformation {\n  globalInfo {\n    languages {\n      id\n      backendID\n      language\n      code\n      __typename\n    }\n    __typename\n  }\n}\n"
        });
        new this.request(this.getAuthkey, postData, (result) => {
            result = JSON.parse(result);
            if (result.errors !== undefined) {
                throw new Error(result.errors['0'].message);
            }

            callback(result);
        });
    };

    getChannelTopContributorsByDisplayName(displayName, amountToShow, rule, callback) {
        if (rule !== 'THIS_STREAM' && rule !== 'THIS_MONTH' && rule !== 'ALL_TIME') {
            throw new Error('Invalid rule! Use one of the following rules: THIS_STREAM | THIS_MONTH | ALL_TIME');
        }


        if (this.getChannelInformationByDisplayName(displayName, (result) => {
            if (result.livestream !== null) {
                let postData = JSON.stringify(
                    {
                        "operationName": "TopContributors",
                        "variables": {
                            "displayname": displayName,
                            "first": amountToShow,
                            "rule": rule,
                            "queryStream": true
                        },
                        "query": "query TopContributors($displayname: String!, $rule: ContributionSummaryRule, $first: Int, $after: String, $queryStream: Boolean!) {\n  userByDisplayName(displayname: $displayname) {\n    id\n    ...TopContributorsOfStreamerFrag @skip(if: $queryStream)\n    livestream @include(if: $queryStream) {\n      ...TopContributorsOfLivestreamFrag\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment TopContributorsOfStreamerFrag on User {\n  id\n  topContributions(rule: $rule, first: $first, after: $after) {\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    list {\n      amount\n      contributor {\n        id\n        ...VDliveNameFrag\n        ...VDliveAvatarFrag\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment VDliveNameFrag on User {\n  displayname\n  partnerStatus\n  __typename\n}\n\nfragment VDliveAvatarFrag on User {\n  avatar\n  __typename\n}\n\nfragment TopContributorsOfLivestreamFrag on Livestream {\n  id\n  topContributions(first: $first, after: $after) {\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    list {\n      amount\n      contributor {\n        id\n        ...VDliveNameFrag\n        ...VDliveAvatarFrag\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n"
                    }
                );
                new this.request(this.getAuthkey, postData, (result) => {
                    result = JSON.parse(result);
                    if (result.errors !== undefined) {
                        throw new Error(result.errors['0'].message);
                    }

                    callback(result.data.userByDisplayName.livestream.topContributions);
                });
            } else {
                let postData = JSON.stringify(
                    {
                        "operationName": "TopContributors",
                        "variables": {
                            "displayname": displayName,
                            "first": amountToShow,
                            "rule": rule,
                            "queryStream": false
                        },
                        "query": "query TopContributors($displayname: String!, $rule: ContributionSummaryRule, $first: Int, $after: String, $queryStream: Boolean!) {\n  userByDisplayName(displayname: $displayname) {\n    id\n    ...TopContributorsOfStreamerFrag @skip(if: $queryStream)\n    livestream @include(if: $queryStream) {\n      ...TopContributorsOfLivestreamFrag\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment TopContributorsOfStreamerFrag on User {\n  id\n  topContributions(rule: $rule, first: $first, after: $after) {\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    list {\n      amount\n      contributor {\n        id\n        ...VDliveNameFrag\n        ...VDliveAvatarFrag\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment VDliveNameFrag on User {\n  displayname\n  partnerStatus\n  __typename\n}\n\nfragment VDliveAvatarFrag on User {\n  avatar\n  __typename\n}\n\nfragment TopContributorsOfLivestreamFrag on Livestream {\n  id\n  topContributions(first: $first, after: $after) {\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    list {\n      amount\n      contributor {\n        id\n        ...VDliveNameFrag\n        ...VDliveAvatarFrag\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n"
                    }
                );
                new this.request(this.getAuthkey, postData, (result) => {
                    result = JSON.parse(result);
                    if (result.errors !== undefined) {
                        throw new Error(result.errors['0'].message);
                    }

                    callback(result.data.userByDisplayName.topContributions);
                });
            }

        })) ;
    }

};

module.exports = dliveInit;
