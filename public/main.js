/*
var openings = new Firebase('https://starwarsopening.firebaseio.com/openings');

var text = "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.\n"+
"During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.\n"+
"Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plan that can save her people and restore freedom to the galaxy....";

var x = openings.push({episode: "Episode IV", title: "A NEW HOPE", text:text});
console.log(x);

openings.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

//*/

var notPlayed = true;

$(window).on('hashchange', function() {
    var key = location.hash.replace('#!/', '').split('/')[0];
    console.log(key);
    if(key != ""){
        $('.spinner-loader').show();
        try{
            var fb = new Firebase('https://starwarsopening.firebaseio.com/openings/-'+key);
            fb.on("value", function(snapshot) {
                $('.spinner-loader').hide();
                var opening = snapshot.val();
                console.log(opening);

                StarWars.animation.find("#intro").text(opening.intro);
                StarWars.animation.find("#episode").text(opening.episode);
                StarWars.animation.find("#title").text(opening.title);

                var ps = opening.text.split('\n');

                var div = StarWars.animation.find("#text");
                for(var i in ps){
                    div.append($('<p>').text(ps[i]));
                }
                $(window).focus(function(){
                    if(notPlayed){
                        StarWars.play();
                        notPlayed = false;
                    }
                });

            }, function (errorObject) {
              throw errorObject;
            });
        }catch(error){
            location.hash = "";
            $('.spinner-loader').hide();
        }
    }
});

$(document).ready(function() {
  window.dispatchEvent(new Event('hashchange'));
});