var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/images'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
*/
app.post('/data', function(req, res) {
    console.log(req.body.RegFullName);
    console.log(req.body.RegEmailID);
    
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'altius_2k15'
    } );
	connection.connect(); 
	if(req.body.RegFullName)
	{
	
	var post = {
        username: req.body.RegFullName,
        emailId: req.body.RegEmailID,
		password:req.body.RegPassword
    };
	
	var query = connection.query('INSERT INTO `login` SET ?', post, function(err, result) {
  // Neat!
});
console.log(query.sql);
	}
		
	if(req.body.LogEmailID)
	{
		connection.query("select * from login where emailId = '"+req.body.LogEmailID+"' and password='"+req.body.LogPassword+"' ",function(err,rows){
			console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length!=0) {
	                
                    res.statusCode = 302; 
    res.setHeader("Location", "/index.html");
    res.end();
					
            
			 }			
	});
	}
	
	var query = connection.query('SELECT * FROM `login`');

query.on('error', function(err) {
    throw err; });

query.on('fields', function(fields) {
    console.log(fields); })

query.on('result', function(row) {
    console.log(row); }); connection.end();

	
});
app.listen(3000);