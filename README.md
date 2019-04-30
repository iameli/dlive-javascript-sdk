
This project was forked from [the last MIT-redistributable commit of dlive-unofficial-api-js](86e4c1b0a6e94a35cea9f6a09f4a2128e9e9112b). They've moved to a nonfree license; this fork will remain freely licensed.

## Example
```js
const  { Dlive } = require('dlive-javascript-sdk')

const blockchainName = 'YOUR BLOCKCHAIN NAME (e.g. dlive-1234567890)' // Our Blockchain username
const accessKey = 'YOUR KEY' // Our access key

// Chat cooldown
const coolDown = 3000 // 3 seconds

// Parameter 1: Blockchain username
// Parameter 2: Your access key for sending messages
let example = new Dlive(blockchainName, accessKey) // Joining sampepper

example.on('ChatText', (message) => {
  console.log(`Messages in Channel ${example.getChannel}: ${message.content}`)

  if (message.content === '!song') {
    example.sendMessage('Currently no track available...').then((result) => {
      console.log('Message sended!')
      console.log(result)
    }).catch((error) => {
      console.log(`Error while sending message! ${error}`)
      // Now we can use our function to try to resend, at this point you would directly use our own function. Please do not use this example in productive use, because it is ...
      sendMessage('Currently no track available...')
    })
  }
})

example.on('ChatFollow', (message) => {
  // Say thanks to this user for his follow!
  sendMessage(`Thanks for the follow, @${message.sender.displayname}`)
})

example.on('ChatGift', (message) => {
  // Say thanks to this user for his gift!
  sendMessage(`Thanks for ${message.amount}x ${message.gift}, @${message.sender.displayname}`)
})

// Get our channel informations
example.getChannelInformationByDisplayName('pewdiepie' /* enter a displayname, not the Blockchain username */).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})

function sendMessage (message) {
  example.sendMessage(message).catch((error) => {
    console.log(`Oh no.. error! ${error} - Retry in ${coolDown / 1000} seconds!`)
    setTimeout(sendMessage, coolDown, message)
  })
}
```
