var express = require('express');
//ch4
var app = express();
var fortune = require('./lib/fortune');
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res){
    // res.send('MeadowLark Travel');
    res.render('home');
});
/*

app.get('/headers', function(req, res){
    res.type('text/plain');
    var s = '';
    for(var name in req.headers) {
        s+= name + ': ' + req.headers[name] + '\n';
    }
    res.send(s);
});*/

app.get('/testblocks',function(req, res){
    res.render('testBlocks', {
        currency: {
            name: 'United states dollars',
            abbrev: 'USD'
        },
        tours: [
            {name: 'Hood River', price: '$99.95'} ,
            {name: 'Oregon Coast', price: '159.95'}
        ],
        specialsUrl: '/january-specials',
        currencies:['USD', 'GBP', 'BTC']
    });
} );

app.get('/about', function(req, res){
   res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
    } );
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res){
    res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
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
