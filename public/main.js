// sweet alerts config
swal.setDefaults({
    customClass: 'star-wars-alert',
});

var OpeningKey = null;

var defaultOpening = null; // to check if user not edited the default opening

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
var showFooter = true;
window.setLoading = function (){
    $('#loader').show();
    $('#form-starwars').hide();
}

window.unsetLoading = function (){
    $('#loader').hide();
    $('#form-starwars').show();
}

setLoading();

$('#form-starwars').submit(function(event) {
  event.preventDefault();
  var opening = getOpeningFormValues();
  var before = StarWars.opening;
  if(!isOpeningsDifferents(opening, before)){ // User replay the same intro without modification, doesn't need to create a new one
      var hashbefore = location.hash;
      var hashnow = '!/'+OpeningKey;
      location.hash = hashnow;
      if(hashbefore !== hashnow){ // if user is in edit form but not in /edit url, force hashchange because the hash will be the same.
          window.dispatchEvent(new Event('hashchange'));
      }
    return;
  }

  if(!isOpeningsDifferents(opening,defaultOpening)){
      setLoading();
      location.hash = '!/Episode8';
      return;
  }

  var aLogo = opening.logo.split('\n');
  if(aLogo.length > 2){
      sweetAlert("Oops...", "Logo can't have more than 2 lines.", "warning");
      return;
  }
  var aIntro = opening.intro.split('\n');
  if(aIntro.length > 2){
      sweetAlert("Oops...", "Intro text can't have more than 2 lines.", "warning");
      return;
  }


    for(var key in opening){
        if(opening[key] == "string" && opening[key].indexOf("??") > -1){
            sweetAlert("Oops...", "Your text can't contain the sequence \"??\", please fix it and submit again.", "error");
            return;
        }
    }

  setLoading();
  $.ajax({
      url: "https://starwarsopeninga.firebaseio.com/openings.json",
      method: "POST",
      data: JSON.stringify(opening),
      dataType: "json",
      success: function(data){
          var key = 'A'+data.name.substring(1);
          CreatedIntros.save(key,opening);
          location.hash = '!/'+key;
      },
      error: ajaxErrorFunction('Error when creating the intro.\n\n'+JSON.stringify(opening))
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
        $('[name=custom]').val(key);
        try{
            key = parseSpecialKeys(key);
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

                var title = StarWars.animation.find("#title")
                if(checkCompatibleSWFont(opening.title)){
                    title.addClass('SWFont');
                }
                title.text(opening.title);

                var ps = opening.text.split('\n');

                var div = StarWars.animation.find("#text");
                div.text('');
                for(var i in ps){
                    div.append($('<p>').text(ps[i]));
                }

                div.css('text-align',opening.center ? 'center':'');

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
                            unsetLoading();
                            playbutton = $('<div class="verticalWrapper"><div class="playAudio"><button id="playBut" class="playButton" style="font-size: 80px">Play</button></div></div>');
                            $('body').append(playbutton);
                            $('#playBut',playbutton).click(function(){
                                setLoading();
                                playbutton.remove();
                            });
                            StarWars.audio.oncanplaythrough = function () {
                                notPlayed = false;
                                StarWars.play();
                            };
                        }else{
                            notPlayed = false;
                            StarWars.play();
                        }
                        if(edit){
                            StarWars.audio.currentTime = 97;
                            $('#form-starwars').show();
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

            },
            error: ajaxErrorFunction('Error when try to load the intro '+key)
            });
        }catch(error){
            location.hash = "";
            setLoading();
        }
    }else{
        if(!notPlayed){
            StarWars.reset();
            StarWars.resetAudio();
        }else{
            unsetLoading();
        }

    }
    ga('send', 'pageview', {
        'page': location.pathname + location.search  + location.hash
    });
});

function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

$(document).ready(function() {
    if(getInternetExplorerVersion() !== -1){
        sweetAlert("Internet Explorer Detected", "This website is not compatible with Internet Explorer, please use Chrome. Sorry for the inconvenience.", "error");
        unsetLoading();
        return;
    }
    defaultOpening = getOpeningFormValues(); // get the default opening from the default form values
    window.dispatchEvent(new Event('hashchange'));

    $('#f-center').change(function(){
        var center = $(this).is(':checked');
        $('#f-text').css('text-align', center == true ? 'center' : 'initial');
    });
});

var calcTime = function(queue){
    var minutes = (queue+1)*30;
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

var termsOfServiceText = 'By using this website you are agreeing to our <a style="color: #ffd54e;font-weight:bold;" href="termsOfService.html" target="_blank">Terms of Service</a>.';

var requestVideo = function(donate, email){
    if(email === false) return false;
    if (!validateEmail(email)) {
        swal.showInputError("You need to type an e-mail!");
        return false;
    }

    var url = "https://endor.nihey.org/request?code="+ OpeningKey +"&email=" + email;
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
                   '<p style="margin-top: 15px;text-align: justify">But as you donated, we will bump you up on the queue.'+
                    '  Thank you so much for supporting us! You should receive the confirmation email within a few minutes.'+
                   '</p>'
                  ) :
                  ''
              ) +
              '<p style="text-align: justify;margin-top: 15px;">'+termsOfServiceText+'</p>'
            });
        },
        error: ajaxErrorFunction('Error when request video download.')
    });

};

$("#videoButton").click(function(){
    var now = getOpeningFormValues();
    var before = StarWars.opening;

    if(isOpeningsDifferents(now, before)){ // prevent user to request download without save the edited intro
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
    // swal({
    //     html: true,
    //     title: '<h2 style="font-family: StarWars;">loading</h2>',
    //     text: '<iframe src="./atat.html" height="200px"></iframe>',
    //     animation: "slide-from-top",
    //     showConfirmButton: false
    // });
    $.ajax({
            url: "https://endor.nihey.org/status?code="+OpeningKey,
            crossDomain: true,
            success: function(data){
                var queue = data.queue;
                if(data.url){
                    swal({
                        html: true,
                        title: '<h2 style="font-family: StarWars;">Download</h2>',
                        text: '<p style="text-align: left">'+
                        'This video has already been generated, click the link below to download.<br><br>'+
                        '<a style="color: #ffd54e;" href="'+data.url+'">'+data.url+'</a></p>',
                    });
                }else{
                    swal({
                        html: true,
                        title: '<h2 style="font-family: StarWars;">Donate and Download</h2>',
                        text: '<p style="text-align: left">'+
                        'We want to provide videos for free, but we have to use a server to render it, which costs money.<br>'+
                        'There are <b>'+(queue+1)+' videos</b> in front of you and it will take <b>'+calcTime(queue)+'</b> to be processed.<br><br>'+
                        'Can\'t wait for it? Donate at least <b>5 US Dollars</b>, you will jump the queue and your video will be ready in few hours.<br>'+
                        'The video will be rendered in HD quality and MP4 file. To see a sample video click '+
                        '<a style="color: #ffd54e;font-weight:bold;" href="https://www.youtube.com/watch?v=IQf8AN07T_E" target="_blank">here</a>.'+
                        'Donate at least <b>10 US Dollars</b> and you will get the video in <b>Full HD resolution (1920x1080)</b><br><br>'+
                        '<b>Attention!</b> Make sure there are no typos in your text, there will be no correction after the video rendering.<br>'+
                        termsOfServiceText+
                        '</p>'+
                        '<iframe src="./atat.html" height="200px"></iframe>',
                          showCancelButton: true,
                          confirmButtonText: "Yes, donate!",
                          confirmButtonColor: "#807300",
                          cancelButtonText: "No, I'll get in the queue!",
                          closeOnConfirm: false,
                          closeOnCancel: false,
                          animation: false
                    },function(donate){

                        var generateAlert = {
                            html: true,
                            title: '<h2 style="font-family: StarWars;">Generate video</h2>',
                            text: '<p style="text-align: justify">'+
                            'Type your email below and you will receive a message with the URL to download your video when it\'s ready. We promise not to send spam!'+
                            '</p>' + (donate ? [
                              '<br><p style="text-align: justify">',
                              '  Please, use the same email from you PayPal account.',
                              "  If you want to receive in another e-mail too, click on download button again and add more e-mails. You don't need to donate again.",
                              '  <br><br>',
                              '  Attention! Make sure there are no typos in your text, you will need to request a new video download and donate again.<br><br>',
                              '  '+termsOfServiceText,
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
                            generateAlert.text = 'Click on the button below:'
                            +'<br><iframe src="./donateButtons.html#!/' + OpeningKey + '" height="100"></iframe>'+generateAlert.text;
                        }
                        swal(generateAlert, requestVideo.bind(window, donate));
                    });
            }
        },
        error: ajaxErrorFunction('Error when request video information to download.')
    });

});

function getOpeningFormValues(){ // read the opening from form and create the object
    return {
        intro: $("#f-intro").val(),
        logo: $("#f-logo").val(),
        episode: $("#f-episode").val(),
        title: $("#f-title").val(),
        text: $("#f-text").val(),
        center: $("#f-center").prop('checked')
    };
};

function isOpeningsDifferents(a,b){ // compare two openings texts to see if they are different
    var changes =[];
    if(a === null || b == null ){
        return true;
    }
    changes.push(a.intro !== b.intro);
    changes.push(a.logo !== b.logo);
    changes.push(a.episode !== b.episode);
    changes.push(a.title !== b.title);
    changes.push(a.text !== b.text);
    changes.push(a.center !== b.center && b.center !== undefined);

    return changes.reduce(function(c,e){
        return c || e;
    },false);
};

function parseSpecialKeys(key){
    switch (key) {
        case "Episode7": // Episode7 is a special key for URL, it plays the Episode 7 opening
            return "AKcKeYMPogupSU_r1I_g";
        case "Episode8":
            return "AL6yNfOxCGkHKBUi54xp";
        // TODO other eps
        default:
            return key;
    }
}

function checkCompatibleSWFont(title){
    var supportedChars = " qwertyuiopasdfghjklzxcvbnm0123456789!$".split(''); // all supported supported chars
    var unique = title.toLowerCase().split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }); // get unique characters from the input string
    for(var i=0;i<unique.length;i++){
        if(supportedChars.indexOf(unique[i]) == -1){
            return false;
        }
    }
    return true;
}