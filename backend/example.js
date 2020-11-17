var express = require('express');
var app = express();
var mysql = require('mysql');
var https = require('https');
const fs = require('fs');

var privateKey = fs.readFileSync('C:/xampp/apache/crt/lp5-ann19-dsy.dsone.3ds.com/server.key', 'utf8');
var certificate = fs.readFileSync('C:/xampp/apache/crt/lp5-ann19-dsy.dsone.3ds.com/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(4242, "lp5-ann19-dsy.dsone.3ds.com", function () {
    var host = httpsServer.address().address;
    var port = httpsServer.address().port;
    console.log("Example app listening at https://%s:%s", host, port);
});

var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test'
});
