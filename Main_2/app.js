var express=require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
//var svgFallback = require('express-svg-fallback');
//app.use(svgFallback());
//app.use(express.static('assets'));
app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/data', function(req, res) {
    console.log(req.body.RegFullName);
	console.log(req.body.RegEmailID);
    console.log(req.body.RegPassword);
    

var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'altius_2k15'
    } );
	connection.connect(); 
	var post = {
        username: req.body.RegFullName,
		email: req.body.RegEmailID,
        password: req.body.RegPassword
    };
	var query = connection.query('INSERT INTO `register` SET ?', post, function(err, result) {
  // Neat!
});
console.log(query.sql);


var query = connection.query('SELECT * FROM `register`');

query.on('error', function(err) {
    throw err; });

query.on('fields', function(fields) {
    console.log(fields); })

query.on('result', function(row) {
    console.log(row); }); connection.end();

	
});

var exec = require("child_process").exec;
app.get('/', function(req, res){exec("php download.php", function (error, stdout, stderr) {res.send(stdout);});});
app.listen(3000);