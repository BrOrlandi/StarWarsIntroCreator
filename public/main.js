// sweet alerts config
swal.setDefaults({
    customClass: 'star-wars-alert',
});

var OpeningKey = null;

// make audio load on mobile devices
var audio = document.getElementsByTagName('audio')[0];
var audioIsLoaded = false;
var loadData = function () {
    if(!audioIsLoaded){
        audio.load();
        audioIsLoaded = true;
    }
};
document.body.addEventListener('touchstart', loadData);


// prevent arrow scrolling in firefox
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
    logo: $("#f-logo").val(),
    episode: $("#f-episode").val(),
    title: $("#f-title").val(),
    text: $("#f-text").val(),
  };
  var aLogo = opening.logo.split('\n');
  if(aLogo.length > 2){
      sweetAlert("Oops...", "Logo can't have more than 2 lines.", "warning");
      return;
  }
  $.ajax({
      url: "https://starwarsopening.firebaseio.com/openings.json",
      method: "POST",
      data: JSON.stringify(opening),
      dataType: "json",
      success: function(data){
          toggleLoading();
          location.hash = '!/' + data.name.substring(1);
      }
  });
});

$(window).on('hashchange', function() {
    $("#playBut").remove();
    var key = location.hash.replace('#!/', '').split('/')[0];
    $('body').removeClass('running');
    if(key != ""){
        try{
            var url = 'https://starwarsopening.firebaseio.com/openings/-'+key+'.json';
            $.ajax({
              url: url,
              success: function(opening) {
                if(opening == null){
                    sweetAlert("Oops...", "Introduction not found!", "error");
                    return;
                }
                StarWars.opening = opening;
                OpeningKey = key;
                $("#videoButton").show();

                var intro = opening.intro.replace(/</g,"&lt;");
                intro = intro.replace(/>/g,"&gt;");
                intro = intro.replace(/\n/g,"<br>");
                StarWars.animation.find("#intro").html(intro);
                StarWars.animation.find("#episode").text(opening.episode);
                StarWars.animation.find("#title").text(opening.title);

                var ps = opening.text.split('\n');

                var div = StarWars.animation.find("#text");
                div.text('');
                for(var i in ps){
                    div.append($('<p>').text(ps[i]));
                }

                $('#logosvg',StarWars.animation).css('width',$(window).width()+'px'); // set width of the logo
                $('#logoimg',StarWars.animation).css('width',$(window).width()+'px');

                var logoText = opening.logo ? opening.logo : "star\nwars";
                var aLogo = logoText.split('\n'); // breaks logo text in 2 lines
                var logo1 = aLogo[0];
                var logo2 = aLogo[1] || "";
                if(logoText.toLowerCase() != "star\nwars"){
                    var texts = $('#logosvg text',StarWars.animation);
                    texts[0].textContent = logo1;
                    texts[1].textContent = logo2;

                    // calculate the svg viewBox using the number of characters of the longest world in the logo.
                    var logosize = logo1.length > logo2.length ? logo1 : logo2;
                    var vbox = '0 0 '+logosize.length*200+' 500';
                    $('#logosvg',StarWars.animation).each(function () {$(this)[0].setAttribute('viewBox', vbox) });
                    $('#logosvg',StarWars.animation).show();
                    $('#logoimg',StarWars.animation).hide();
                }else{ // if the logo text is "Star Wars" set to the logo SVG.
                    $('#logosvg',StarWars.animation).hide();
                    $('#logoimg',StarWars.animation).show();
                }

                var play = function(){
                    $.when(StarWars.audioDefer).then(function(){
                        var buffered = StarWars.audio.buffered.end(StarWars.audio.buffered.length-1);
                        if(buffered == 0 && !audioIsLoaded){
                            $('#loader').hide();
                            playbutton = $('<div class="verticalWrapper"><div class="playAudio"><button id="playBut" class="playButton" style="font-size: 80px">Play</button></div></div>');
                            $('body').append(playbutton);
                            $('#playBut',playbutton).click(function(){
                                $('#loader').show();
                                playbutton.remove();
                            });
                            StarWars.audio.oncanplaythrough = function () {
                                toggleLoading();
                                notPlayed = false;
                                StarWars.play();
                            };
                        }else{
                            toggleLoading();
                            notPlayed = false;
                            StarWars.play();
                        }
                    });
                };

                if(document.hasFocus()){ // play if has focus
                        play();
                }else{
                    $(window).focus(function(){ // play when got focus
                        if(notPlayed){
                            play();
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

var calcTime = function(queue){
    var minutes = (queue+1)*40;
    if(minutes > 60){
        var hours = Math.floor(minutes/60);
        return hours + " hours and "+minutes%60+" minutes";
    }else{
        return minutes+" minutes";
    }
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var requestVideo = function(email){
    if(email === false) return false;
    if (!validateEmail(email)) {
        swal.showInputError("You need to type an e-mail!");
        return false;
    }

    var url = "https://nihey.duckdns.org:1980/video-request?code="+ OpeningKey +"&email=" + email;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        success: function(data){
            var queue = data.queue;
            swal({
                html: true,
                title: '<h2 style="font-family: StarWars;">video request sent</h2>',
                text:'<p style="text-align: justify">'+
                'Your video has been queued. The current size of the queue is <b>'+
                (queue+1) + '</b>, which will take up to <b>'+ calcTime(queue) +'</b>.<br>'+
                'The link to download the video will be sent to the e-mail:<br>'+
                '</p><span style="text-align: center; font-weight: bold">'+email+'</span>'
            });
        }
    });

};

$("#videoButton").click(function(){
    $.ajax({
            url: "https://nihey.duckdns.org:1980/status?code="+OpeningKey,
            crossDomain: true,
            success: function(data){
                if(data.url){
                    swal({
                        html: true,
                        title: '<h2 style="font-family: StarWars;">Download</h2>',
                        text: '<p style="text-align: justify">'+
                        'This video has already been generated, click the link below to download.<br><br>'+
                        '<a style="color: #ffd54e;" href="'+data.url+'">'+data.url+'</a></p>',
                    });
                }else{
                    swal({
                        html: true,
                        title: '<h2 style="font-family: StarWars;">Donate and Download</h2>',
                        text: '<p style="text-align: justify">'+
                        'The download functionality is experimental. It takes a server to process the video, which costs money.<br>'+
                        'There are videos in the processing queue, it will take some time to be processed.<br>'+
                        'Consider donating at least <b>5 dollars</b> and we will provide your video as soon as possible.</p>',
                          showCancelButton: true,
                          confirmButtonText: "Yes, donate!",
                          confirmButtonColor: "#807300",
                          cancelButtonText: "No, I'll get in the queue!",
                          closeOnConfirm: false,
                          closeOnCancel: false,
                          animation: "slide-from-top"
                    },function(donate){

                        var generateAlert = {
                            html: true,
                            title: '<h2 style="font-family: StarWars;">Generate video</h2>',
                            text: '<p style="text-align: justify">'+
                            'Type your email bellow and you will receive a message with the URL to download your video when it\'s ready'+
                            '</p>',
                            type: 'input',
                            showCancelButton: true,
                            inputPlaceholder: "Your e-mail...",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        };

                        if(donate){
                            generateAlert.title = '<h2 style="font-family: StarWars;">Donate</h2>';
                            generateAlert.text = 'Click on the button bellow:'
                            +'<br><iframe src="./donateButtons.html" height="100"></iframe>'+generateAlert.text;
                        }
                        swal(generateAlert,requestVideo);
                    });
            }
        }
    });

});
