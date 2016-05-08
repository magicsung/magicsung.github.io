var express = require('express');
var app = express();
var http = require('http').Server(app);
livereload = require('livereload');

app.use('/', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/image', express.static(__dirname + '/images'));
app.use('/daily-ui', express.static(__dirname + '/daily-ui'));

http.listen(8080, "0.0.0.0", function(){
  console.log('listening on *:8080');
});

server = livereload.createServer();

server.watch([__dirname + "/views", __dirname + "/js", __dirname + "/css", __dirname + "/daily-ui"]);
