require("dotenv").config();
var request = require('request');
var fs = require('fs');
const keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter)


var params = process.argv.slice(2);
switch(params[0]) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      if(params[1]){  //if a song is put named in 4th paramater go to function
        x = params[1]
      spotifyIt(x);
    
    } else {  //if blank call Michael Jackson's Thriller"
       x = '<I want it that way>'
      spotifyIt(x);
    }
      break;
    case "movie-this":
    if(params[1]){  //if a movie is inserted in 4th paramater go to function
        x = params[1];
      myMovie(x);
    } else {  //if blank call Mr. Nobody"
       x = "Mr.Nobody"
      myMovie(x);
    }
      break;
};


//spotify things
function spotifyIt() {
    spotify.search({ type: 'track', query: x }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;  //from spotify npm docs
      }
      else{
      var songInfo = data.tracks.items[0];
        console.log(songInfo.artists[0].name)
        console.log(songInfo.name)
        console.log(songInfo.album.name)
        console.log(songInfo.preview_url)
      };
    });
  }  
//end spotify things


//twitter things
function twitter(){
 var twitterOptions = { screen_name: 'mervinbgmailco1',
                        count: 20 };

        client.get('statuses/user_timeline', twitterOptions , function(err, tweets) {
        for (var i = 0; i < tweets.length ; i++) {
            console.log(tweets[i].text);
        }
        })
};
//end twitter things

//movie stuff
function myMovie(snapshot){

    request("http://www.omdbapi.com/?t="+snapshot+"&y=&plot=short&r=json&apikey=84c7b42c", function(error,data,body) {
     var obj = JSON.parse(data.body)
      console.log(obj.Title);
      console.log(obj.Year);
      console.log(obj.imdbRating);
      console.log(obj.Country);
      console.log(obj.Language);
      console.log(obj.Plot);
      console.log(obj.Actors);
           
    });
};
//end movie stuff

fs.readFile('log.txt', 'utf8', function(err, data) {  
  if (err) throw err;
  console.log(data);
});