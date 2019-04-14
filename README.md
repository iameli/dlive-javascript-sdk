
# Welcome to DLive unofficial API!

Hi! This API is still in the development stage.   
However, here you can find some examples of what the API can do.  
  
  [![NPM](https://nodei.co/npm/dlivetv-unofficial-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dlivetv-unofficial-api/)


## Example
```js
let dlive = require('dlivetv-inofficial-api');

let example1 = new dlive();
let example2 = new dlive();

// Parameter 1: the intance
// Parameter 2: the channel name / blockchain username
// Parameter 3: Your access key for sending messages

example1.doInit(example1, 'pdp', 'abc'); // Joining PewDiePie
example1.events.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example1.getChannel}: ${message.content}`);
});


// Now let's create a second instance
example2.doInit(example2, 'dlive-12278051', 'abc'); // Joining sampepper
example2.sendMessage('Hello! Its me, a bot.');

example2.events.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example2.getChannel}: ${message.content}`);
});
example2.events.on('ChatFollow', (message) => {
    // Say thanks to this user for his follow!
    example2.sendMessage(`Thanks for the follow, @${message.sender.displayname}`);
});
example2.events.on('ChatGift', (message) => {
    // Say thanks to this user for his gift!
    example2.sendMessage(`Thanks for ${message.amount}x ${message.gift}, @${message.sender.displayname}`);
});
```
## Todo

 - Message types:
     - [X] ChatText
	 - [X] ChatFollow
	 - [X] ChatGift
	 - [X] ChatDelete
- [X] Send messages
- [X] Get channel informations

## Examples and functions
	 
More [examples](https://github.com/timedotcc/dlivetv-unofficial-api/wiki/Examples) and [functions](https://github.com/timedotcc/dlivetv-unofficial-api/wiki/Functions) can you find in our [wiki](https://github.com/timedotcc/dlivetv-unofficial-api/wiki).