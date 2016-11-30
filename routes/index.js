var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.post('/', function (req, res) {
    var msg = "IP: " + req.body.ip + " received.";
    console.log(msg);
    res.json({result: msg});
});

module.exports = router;