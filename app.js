// settings
const s = {
    nodeport: 3000,
    ioport: 1111
};

const fileoptions = {
    root: __dirname + '/views/',
    dotfiles: 'ignore'
};



// start app
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crypto = require('crypto');

const data = require('./static/js/data');
const samplegame = require('./static/js/samplegame');



// set directory for static files with express.static middleware
app.use(express.static('static'));



// routes + middleware to catch 404s
app.get('/', function (req, res) {
    res.sendFile('start.html', fileoptions);
});

app.get('/play/*', function (req, res) {
    res.sendFile('play.html', fileoptions);
});

app.use(function(req, res) {
    res.sendFile('404.html', fileoptions);
});



// establish socket connection
io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('updategamestate', samplegame);
});



// start server
server.listen(s.nodeport, function () {
    console.log('Listening on port %s...', s.nodeport);
});