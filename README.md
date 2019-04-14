<p align="center">
    <a href="#"><img src="https://i.imgur.com/XXdD3AH.png" /></a>
    <br />
    <br />
    <a href="https://discord.gg/hRWra7r"><img src="https://discordapp.com/api/guilds/567034368002883594/embed.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/dlivetv-unofficial-api"><img src="https://img.shields.io/npm/v/dlivetv-unofficial-api.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.codacy.com/app/nikl/dlivetv-unofficial-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=timedotcc/dlivetv-unofficial-api&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/f75770899e224c5383b17f583fdc008d"/></a>
    <a href="https://www.patreon.com/dliveapi"><img src="https://img.shields.io/badge/Donate-Patreon-e85b46.svg" alt="Patreon" /></a>
    <br />
    <br />
    <a href="https://nodei.co/npm/dlivetv-unofficial-api/"><img src="https://nodei.co/npm/dlivetv-unofficial-api.png?compact=true"></a>
</p>

## Example
```js
let dlive = require('dlivetv-unofficial-api');

// Parameter 1: the channel name / blockchain username
// Parameter 2: Your access key for sending messages

let example1 = new dlive('pdp', 'abc');  // Joining PewDiePie
let example2 = new dlive('dlive-12278051', 'abc');  // Joining sampepper

example1.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example1.getChannel}: ${message.content}`);
});

example2.sendMessage('Hello! Its me, a bot.');

example2.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example2.getChannel}: ${message.content}`);
});
example2.on('ChatFollow', (message) => {
    // Say thanks to this user for his follow!
    example2.sendMessage(`Thanks for the follow, @${message.sender.displayname}`);
});
example2.on('ChatGift', (message) => {
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
