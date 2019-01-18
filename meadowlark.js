var express = require('express');
//ch4
var app = express();
var fortune = require('./lib/fortune');
var handlebars = require('express3-handlebars').create({defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }    
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res){
    // res.send('MeadowLark Travel');
    res.render('home');
});

app.get('/jquery', function(req, res){
    res.render('jquery-test');
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
        currencies:['USD', 'GBP', 'BTC'],
        yolo: testDownHere,
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


function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ],
    };
}

function testDownHere(){
    return "yolo";
}