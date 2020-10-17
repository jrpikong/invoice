const fs = require('fs');
//mysql://b377272954bd80:d839ac54@us-cdbr-east-02.cleardb.com/heroku_e1180e8488a4c3c?reconnect=true
//heroku run bash
//require all the controllers
const controllers = {};
const names = fs.readdirSync('./controllers/api/');

names.forEach(name => {
    if (!name.match(/\.js$/)) return;
    if (name === 'index.js') return;
    const controller = require('./' + name);

    controllers[name.replace('.js', '')] = controller;
});

module.exports = controllers;
