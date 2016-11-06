const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      handlebars = require('express3-handlebars');
      mongoose = require('mongoose');
      config = require('config');

const app = express();

var JSONDATA = path.join(__dirname, './server/Data.json');
var DB_URL = config.get('db_url');
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

app.post('/api/postData', function(req,res){
  console.log('saving data');
  console.log(req.body);
  fs.writeFile(JSONDATA, req.body, function(err, data){
    if(err){
      console.log('oh no error writing to the file');
      return err;
    }else {
      console.log('success')
      console.log(data);
    }
  })
});

app.use(function(req,res,next){
  res.sendFile(path.join(__dirname, '/public/404.html'));
});

mongoose.connect(DB_URL);

app.listen(port, function(){
  console.log('connected to port 8080');
});
