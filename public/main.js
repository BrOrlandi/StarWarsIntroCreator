swal.setDefaults({
    customClass: 'star-wars-alert',
});

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    var type = document.activeElement.type || '';
    if(!type.startsWith('text')){
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }
}, false);

var notPlayed = true;
var isLoading = false;
var showFooter = true;

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
  $.ajax({
      url: "https://starwarsopening.firebaseio.com/openings.json",
      method: "POST",
      data: JSON.stringify(opening),
      dataType: "json",
      success: function(data){
          console.log(data);
          toggleLoading();
          location.hash = '!/' + data.name.substring(1);
      }
  });
});

$(window).on('hashchange', function() {
    var key = location.hash.replace('#!/', '').split('/')[0];
    $('body').removeClass('running');
    console.log(key);
    if(key != ""){
        try{
            var url = 'https://starwarsopening.firebaseio.com/openings/-'+key+'.json';
            console.log(url);
            $.ajax({
              url: url,
              success: function(opening) {
                toggleLoading();
                console.log(opening);
                if(opening == null){
                    toggleLoading();
                    sweetAlert("Oops...", "Introduction not found!", "error");
                    return;
                }

                StarWars.animation.find("#intro").text(opening.intro);
                StarWars.animation.find("#episode").text(opening.episode);
                StarWars.animation.find("#title").text(opening.title);

                var ps = opening.text.split('\n');

                var div = StarWars.animation.find("#text");
                div.text('');
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

            }
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
    ga('send', 'pageview', {
        'page': location.pathname + location.search  + location.hash
    });
});

$(document).ready(function() {
  window.dispatchEvent(new Event('hashchange'));

});
