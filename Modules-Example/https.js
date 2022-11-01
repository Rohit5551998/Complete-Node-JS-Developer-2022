// const internals = require('./internals')
const {send, read} = require('./internals')

function request(url, data) {
    // internals.request.send(url, data);
    // return internals.response.read();
    send(url, data);
    return read();
}

const responseData = request('https://www.google.com', 'hello')
console.log(responseData);