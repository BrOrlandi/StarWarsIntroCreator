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

    for(var key in opening){
        if(opening[key].indexOf("??") > -1){
            sweetAlert("Oops...", "Your text can't contain the sequence \"??\", please fix it and submit again.", "error");
            return;
        }
    }

  $.ajax({
      url: "https://starwarsopeninga.firebaseio.com/openings.json",
      method: "POST",
      data: JSON.stringify(opening),
      dataType: "json",
      success: function(data){
          toggleLoading();
          location.hash = '!/A' + data.name.substring(1);
      }
  });
});

$(window).on('hashchange', function() {

    var urlByKey = function(key){
        var code = key.charAt(0);
        if(code === "A"){
            key = key.substr(1);
            return 'https://starwarsopeninga.firebaseio.com/openings/-'+key+'.json';
        }else{
            return 'https://starwarsopening.firebaseio.com/openings/-'+key+'.json';
        }
    };


    $("#playBut").remove();
    var params = location.hash.replace('#!/', '').split('/');
    var key = params[0];
    var edit = false;
    try{
        edit = params[1] === "edit";
    }catch(e){}
    $('body').removeClass('running');
    if(key != ""){
        try{
            var url = urlByKey(key);
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
                        if(edit){
                            StarWars.audio.currentTime = 97;
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
    var minutes = (queue+1)*50;
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    var time = "";
    if(days > 0){
        time += days + " days";
    }
    if(days < 3){
        hours = hours%24;
        minutes = minutes%60;
        if(hours > 0){
            time += " " +hours + " hours";
        }
        if(minutes > 0){
            time += " " +minutes + " minutes";
        }
    }
    return time;
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var requestVideo = function(donate, email){
    if(email === false) return false;
    if (!validateEmail(email)) {
        swal.showInputError("You need to type an e-mail!");
        return false;
    }

    var url = "https://coruscant.nihey.org/request?code="+ OpeningKey +"&email=" + email;
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
                'Your video has been queued. Your current position on the queue is <b>'+
                (queue+1) + '</b>, which will take up to <b>'+ calcTime(queue) +'</b>.<br>'+
                'The link to download the video will be sent to the e-mail:<br>'+
                '</p><span style="text-align: center; font-weight: bold">'+email+'</span>'+
                (
                  donate ?
                  (
                   '<p style="margin-top: 15px">But as you donated, we will bump you up on the queue as' +
                   ' soon as we confirm your donation.</p>'
                  ) :
                  ''
                )
            });
        }
    });

};

$("#videoButton").click(function(){
    var now = {
      intro: $("#f-intro").val(),
      logo: $("#f-logo").val(),
      episode: $("#f-episode").val(),
      title: $("#f-title").val(),
      text: $("#f-text").val(),
    };
    var before = StarWars.opening;
    var changes =[];
    changes.push(now.intro !== before.intro);
    changes.push(now.logo !== before.logo);
    changes.push(now.episode !== before.episode);
    changes.push(now.title !== before.title);
    changes.push(now.text !== before.text);

    var modified = changes.reduce(function(c,e){
        return c || e;
    },false);

    if(modified){
        swal({
            html: true,
            title: '<h2 style="font-family: StarWars;">Text modified</h2>',
            text: '<p style="text-align: justify">'+
            'You have changed some of the text inputs. You need to play the new intro to save and request a download.',
            showCancelButton: true,
            confirmButtonText: "Ok, play it!",
            confirmButtonColor: "#807300",
            animation: "slide-from-top"
        },function(ok){
            if(ok){
                $('#form-starwars').submit();
            }
        });
        return;
    }

    $.ajax({
            url: "https://coruscant.nihey.org/status?code="+OpeningKey,
            crossDomain: true,
            success: function(data){
                var queue = data.queue;
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
                        'We want to provide videos for free, but we have to use a server to render it, which costs money.<br>'+
                        'There are <b>'+(queue+1)+' videos</b> in front of you and it will take <b>'+calcTime(queue)+'</b> to be processed.<br>'+
                        'Can\'t wait for it? Donate at least <b>5 dollars</b>, you will jump the queue and your video will be ready in few hours.<br>'+
                        'The video will be rendered in HD quality and MP4 file. To see a sample video click '+
                        '<a style="color: #ffd54e;text-decoration:none;font-weight:bold;" href="https://www.youtube.com/watch?v=IQf8AN07T_E" target="_blank">here</a>. '+
                        'Attention! Make sure there are no typos in your text, there will be no correction after the video rendering.'+
                        '</p>'+
                        '<iframe src="./atat.html" height="200px"></iframe>',
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
                            '</p>' + (donate ? [
                              '<p style="text-align: justify">',
                              '  Please, use the same e-mail from you PayPal account.',
                              "  You'll be able to add as many e-mails as you want to",
                              '  <b>this video</b> without having to donate again. Just add',
                              '  your other e-mails after the first one, without donating.',
                              '  Attention! Make sure there are no typos in your text, you will need to request a new video download and donate again.',
                              '</p>',
                            ].join('') : ''),
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
                        swal(generateAlert, requestVideo.bind(window, donate));
                    });
            }
        }
    });

});
