const path = require('path');

function getMessages(req, res) {
    // res.json('<ul><li>Hello Albert!</li></ul>');
    // res.sendFile(path.join(__dirname, '..', 'public', 'images','skimountain.jpg'));
    res.render('messages', {
        title: 'Messages to my Friend!',
        friend: 'Elon Musk',
    });
}

function postMessage(req, res) {
    res.json('Updating Messages');
}

module.exports = {
    getMessages,
    postMessage
};