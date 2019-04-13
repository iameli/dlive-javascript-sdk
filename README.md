# Welcome to DLive inofficial API!

Hi! This API is still in the development stage.   
However, here you can find some examples of what the API can do.  
  
  [![NPM](https://nodei.co/npm/dlive-inofficial-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dlive-inofficial-api/)


## Example
```js
require('dlive-inofficial-api');  
  
new dlive_Init().connect('pdp'); // Connect to PewDiePie   

dlive_Event.on('ChatText', (message) => { // Get channel messages  
  console.log(message);  
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
