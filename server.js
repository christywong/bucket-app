const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      handlebars = require('express3-handlebars');
const app = express();

const port = process.env.PORT || 8080;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

require('./server/routes')(app);

app.get('/login', function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/app', function(req,res){
  res.sendFile(path.join(__dirname, '/public/app.html'));
});

app.use(function(req,res,next){
  res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(port, function(){
  console.log('connected to port 8080');
});
