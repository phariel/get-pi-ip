var dns = require('dns');
var os = require('os');
var request = require('request');
var config = require('./config.json');

dns.lookup(os.hostname(), function (err, addr) {
    setInterval(function () {
        request.post('http://' + config.host + ':' + config.port, {form: {ip: addr}});
        console.log(addr + ' had been sent.');
    }, 60000);
});