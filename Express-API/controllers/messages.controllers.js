function getMessages(req, res) {
    res.json('<ul><li>Hello Albert!</li></ul>');
}

function postMessage(req, res) {
    res.json('Updating Messages');
}

module.exports = {
    getMessages,
    postMessage
};