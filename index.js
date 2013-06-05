var express = require('express');
var http = require('q-io/http');
var q = require('q');
var app = express();

var feeds = [
    'http://rss.slashdot.org/Slashdot/slashdot'
];

app.use(express.bodyParser());

app.post('/feeds', function(req, res) {
    var url = req.body.url;
    feeds.push(url);
    res.send('Created', 201);
});

app.get('/read', function(req, res) {
    var reqs = feeds.map(function(u){ return http.read(u); });
    q.all(reqs)
    .then(function(resps) {
        var data = resps.map(function(r) {
            return r.toString('utf-8');
        }).join('');
        var items = parseTitles(data).map(function(t) {
            return '<li>'+ t +'</li>';
        });
        res.send('<ul>'+ items.join('') +'</ul>');
    })
    .fail(function(error) {
        res.send(String(error), 500);
    });
});

app.listen(process.env.PORT || 3000);

function parseTitles(data) {
    var titles = [];
    data.replace(/<title>(.+?)<\/title>/ig, function(_, t) {
        titles.push(t);
    });
    return titles;
}
