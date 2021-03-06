This project was forked from [the last MIT-redistributable commit of dlive-unofficial-api-js](https://github.com/unofficial-dlive-tv-api/dlivetv-unofficial-api-js/commit/86e4c1b0a6e94a35cea9f6a09f4a2128e9e9112b). They've moved to a [non-OSI approved license](https://opensource.org/licenses); this fork will remain MIT licensed.

<p align="center">
    <a href="https://discord.gg/JjwMkK2"><img alt="Discord" src="https://img.shields.io/discord/150889563970076672.svg?label=Discord&style=for-the-badge"></a>
    <a href="https://github.com/iameli/dlive-javascript-sdk/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/iameli/dlive-javascript-sdk.svg?style=for-the-badge&cacheSeconds=30"></a>
    <a href="https://nodei.co/npm/dlive-javascript-sdk/"><img alt="npm" src="https://img.shields.io/npm/v/dlive-javascript-sdk.svg?style=for-the-badge"></a>
       <a href="https://travis-ci.org/iameli/dlive-javascript-sdk"><img alt="Travis" src="https://img.shields.io/travis/iameli/dlive-javascript-sdk.svg?style=for-the-badge"></a>
    <br />
    <br />
    <a href="https://nodei.co/npm/dlive-javascript-sdk/"><img src="https://nodei.co/npm/dlive-javascript-sdk.png?mini=true"></a>
</p>

## Example

```js
const { Dlive } = require("dlive-javascript-sdk");

const blockchainName = "YOUR BLOCKCHAIN NAME (e.g. dlive-1234567890)"; // Our Blockchain username
const accessKey = "YOUR KEY"; // Our access key

// Chat cooldown
const coolDown = 3000; // 3 seconds

// Parameter 1: Blockchain username
// Parameter 2: Your access key for sending messages
let example = new Dlive(blockchainName, accessKey); // Joining sampepper

example.on("ChatText", message => {
  console.log(`Messages in Channel ${example.getChannel}: ${message.content}`);

  if (message.content === "!song") {
    example
      .sendMessage("Currently no track available...")
      .then(result => {
        console.log("Message sended!");
        console.log(result);
      })
      .catch(error => {
        console.log(`Error while sending message! ${error}`);
        // Now we can use our function to try to resend, at this point you would directly use our own function. Please do not use this example in productive use, because it is ...
        sendMessage("Currently no track available...");
      });
  }
});

example.on("ChatFollow", message => {
  // Say thanks to this user for his follow!
  sendMessage(`Thanks for the follow, @${message.sender.displayname}`);
});

example.on("ChatGift", message => {
  // Say thanks to this user for his gift!
  sendMessage(
    `Thanks for ${message.amount}x ${message.gift}, @${
      message.sender.displayname
    }`
  );
});

// Get our channel informations
example
  .getChannelInformationByDisplayName(
    "pewdiepie" /* enter a displayname, not the Blockchain username */
  )
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

function sendMessage(message) {
  example.sendMessage(message).catch(error => {
    console.log(
      `Oh no.. error! ${error} - Retry in ${coolDown / 1000} seconds!`
    );
    setTimeout(sendMessage, coolDown, message);
  });
}
```

MIT License

Copyright (c) 2019 Eli Mallon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Original dlive-unofficial-api-js license:

MIT License

Copyright (c) 2019 Nils Kleinert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
