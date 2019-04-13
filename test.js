const dlive = require('./dlive');

let example1 = new dlive();
let example2 = new dlive();

example1.doInit(example1, 'pdp', 'abcde');
example1.events.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example1.getChannel}: ${message.content}`)
});

example2.doInit(example2, 'dlive-12278051', 'abcde');
example2.events.on('ChatText', (message) => {
    console.log(`Messages in Channel ${example2.getChannel}: ${message.content}`)
});
