swal.setDefaults({
    customClass: 'star-wars-alert',
});

var notPlayed = true;
var isLoading = false;

function toggleLoading(){
    if(isLoading){
        $('#loader').hide();
        $('#form-starwars').show();
    }else{
        $('#loader').show();
        $('#form-starwars').hide();
    }
    isLoading = !isLoading;
};

toggleLoading();

$('#form-starwars').submit(function(event) {
  event.preventDefault();
  var opening = {
    intro: $("#f-intro").val(),
    episode: $("#f-episode").val(),
    title: $("#f-title").val(),
    text: $("#f-text").val(),
  };
  var openings = new Firebase('https://starwarsopening.firebaseio.com/openings');
  var obj = openings.push(opening);
  console.log(obj.key().substring(1));
  toggleLoading();
  location.hash = '!/' + obj.key().substring(1);
});

$(window).on('hashchange', function() {
    var key = location.hash.replace('#!/', '').split('/')[0];
    console.log(key);
    if(key != ""){
        try{
            var fb = new Firebase('https://starwarsopening.firebaseio.com/openings/-'+key);
            fb.on("value", function(snapshot) {
                toggleLoading();
                var opening = snapshot.val();
                console.log(opening);
                if(opening == null){
                    sweetAlert("Oops...", "Introduction not found!", "error");
                    return;
                }

                StarWars.animation.find("#intro").text(opening.intro);
                StarWars.animation.find("#episode").text(opening.episode);
                StarWars.animation.find("#title").text(opening.title);

                var ps = opening.text.split('\n');

                var div = StarWars.animation.find("#text");
                for(var i in ps){
                    div.append($('<p>').text(ps[i]));
                }

                if(document.hasFocus()){
                        StarWars.play();
                        notPlayed = false;
                }else{
                    $(window).focus(function(){
                        if(notPlayed){
                            StarWars.play();
                            notPlayed = false;
                        }
                    });
                }

            }, function (errorObject) {
              throw errorObject;
            });
        }catch(error){
            location.hash = "";
            toggleLoading();
        }
    }else{
        if(!notPlayed){
            StarWars.reset();
            StarWars.resetAudio();
        }else{
            toggleLoading();
        }
        
    }
});

$(document).ready(function() {
  window.dispatchEvent(new Event('hashchange'));

});