const Twitter = require('twitter');
var dotenv = require('dotenv').config()
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// respond with "hello world" when a GET request is made to the homepage
app.use(express.static('dist'));
app.post('/tweet', function(req, res){
  console.log(req.body)
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  let message = req.body.message;
  client.post('statuses/update', {status: message}, function(err, tweet, respon){
    if(err) res.sendStatus(400);
    else{
      res.json(req.body);
    }
  })
})
app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
