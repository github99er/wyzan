var express = require('express');
var path = require ('path');
var mysql = require('./dbcon.js')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7065);

app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts", function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    var parameters = [];
    for (var row in rows){
	var item = 
		{'name': rows[row].name,
		'reps':rows[row].reps,
		'weight': rows[row].reps,
		'date':rows[row].date,
		'id':rows[row].id};
	if (rows[row].lbs){
		item.lbs='lbs';
	}
	else{
		item.lbs='nkg';
	}
	parameters.push(item);
	}
	
    context.results = parameters;
    res.render('home', context);

});

});


app.get('/other-page',function(req,res){
  res.render('other-page');
});


app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
