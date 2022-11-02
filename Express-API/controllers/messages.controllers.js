const path = require('path');

function getMessages(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'images','skimountain.jpg'));
    // res.json('<ul><li>Hello Albert!</li></ul>');
}

function postMessage(req, res) {
    res.json('Updating Messages');
}

module.exports = {
    getMessages,
    postMessage
};