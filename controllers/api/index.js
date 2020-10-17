const fs = require('fs');

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
