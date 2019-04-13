
# Welcome to DLive inofficial API!

Hi! This API is still in the development stage.   
However, here you can find some examples of what the API can do.  
  
  [![NPM](https://nodei.co/npm/dlive-inofficial-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dlive-inofficial-api/)


## Example
```js
let dlive = require('dlive-inofficial-api');

let example1 = new dlive();
let example2 = new dlive();

// Parameter 1: the instance
// Parameter 2: the channel name / blockchain username
// Parameter 3: Your access key for sending messages

example1.doInit(example1, 'pdp', 'abcde'); // Joining PewDiePie
example1.events.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example1.getChannel}: ${message.content}`)
});

// Now let's create a second instance
example2.doInit(example2, 'dlive-12278051', 'abcde'); // Joining sampepper
example2.events.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example2.getChannel}: ${message.content}`);
});
example2.events.on('ChatFollow', (message) => {
    // Say thanks to this user for his follow!
    console.log(`Thanks for the follow, ${message.sender.displayname}`);
});
example2.events.on('ChatGift', (message) => {
    // Say thanks to this user for his gift!
    console.log(`Thanks for ${message.amount}x ${message.gift}, ${message.sender.displayname}`);
});
```
## Todo

 - Message types:
     - [X] ChatText
	 - [X] ChatFollow
	 - [X] ChatGift
- [ ] Send messages
- [ ] Get channel informations
	 

#### Example result: message from the ChatText event above.
```
{ __typename: 'ChatText',
  type: 'Message',
  id: '*CENSORED*',
  content: '*CENSORED*',
  createdAt: '1555167390757848975',
  sender:
   { __typename: 'StreamchatUser',
     id: 'streamchatuser:dlive-*CENSORED*',
     username: 'dlive-*CENSORED*',
     displayname: '*CENSORED*',
     avatar:
      '*CENSORED*',
     partnerStatus: 'NONE' },
  role: 'None',
  roomRole: 'Member',
  subscribing: false }
```