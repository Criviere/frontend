var express = require('express'),
    expressApp = express(),
    expressServer = expressApp.listen(8002);
    
console.log("Listening @ Port 8002");

expressApp.use(express.static(__dirname));

expressApp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With, content-type, authorization, ' +
        'accept, origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});
