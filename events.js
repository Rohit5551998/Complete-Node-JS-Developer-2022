const EventsEmitter = require('events');
const celebrity = new EventsEmitter();

//Subscribe to celebirty for Observer 1
//Listeners are callbacks
celebrity.on('race', (results) => {
    if (results === 'win') {
        console.log('Congratulations! You are the best')
    }
});

//Subscribe to celebirty for Observer 1
celebrity.on('race', (results) => {
    if (results === 'win') {
        console.log('Boo I could have done better')
    }
});

process.on('exit', (code) => {
    console.log('Process exit event with code: ', code)
});

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');
