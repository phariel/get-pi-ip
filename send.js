var os = require('os');
var iFaces = os.networkInterfaces();
var request = require('request');
var config = require('./config.json');

var getIp = function () {
    Object.keys(iFaces).forEach(function (ifname) {
        var alias = 0;

        iFaces[ifname].forEach(function (iFace) {
            if ('IPv4' !== iFace.family || iFace.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            var msg = "";

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                msg += ifname + ':' + alias + ' ' + iFace.address;
            } else {
                // this interface has only one ipv4 address
                msg += ifname + ' ' + iFace.address;
            }
            console.log(msg);
            request.post('http://' + config.host + ':' + config.port, {form: {ip: msg}});
            ++alias;
        });
    });
};

setInterval(getIp, config.sendFrequencySeconds * 1000);

