var fs = require('fs');

//require all the services
var daos = {};
var names = fs.readdirSync('./dao/');

names.forEach(name => {
    if (!name.match(/\.js$/)) return;
    if (name === 'index.js') return;
    var dao = require('./' + name);

    daos[name.replace('.js', '')] = dao;
});

module.exports = daos;