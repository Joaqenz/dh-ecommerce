const fs = require('fs');
function read() {
    return JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));
}

module.exports = read