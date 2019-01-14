var express = require('express');

var app = express();
var fortune = require('./lib/fortune');
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    // res.send('MeadowLark Travel');
    res.render('home');
});

app.get('/about', function(req, res){
   res.render('about', {fortune: fortune.getFortune()});
});


app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('express started on http://localhost:'+
    app.get('port') + 'press ctrl-c to terminate');
});
