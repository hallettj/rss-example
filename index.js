var express = require('express');
var http    = require('q-io/http');
var q       = require('q');
var app     = express();

var feeds = [
    'http://www.reddit.com/.rss'
];

app.use(express.bodyParser());

app.post('/feeds', function(req, res) {
    feeds.push(req.body.url);
    var id = feeds.length - 1;
    res.redirect('/feeds/'+ id);
});

app.get('/feeds/:id', function(req, res) {
    var url = feeds[req.params.id];
    http.read(url)
    .then(function(data) {
        var xml  = data.toString('utf-8');
        var list = parseTitles(xml).map(
            function(title) {
                return '<li>'+ title +'</li>';
            }
        ).join('');
        res.send('<ul>'+ list + '</ul>');
    })
    .fail(function(error) {
        res.send(String(error), 500);
    });
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
    data.replace(/<title>(.+?)<\/title>/ig, function(_, title) {
        titles.push(title);
    });
    return titles;
}
