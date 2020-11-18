const fs = require('fs');
function read() {
    return JSON.parse(fs.readFileSync(__dirname + "/../database/listado.json"));
}

module.exports = read