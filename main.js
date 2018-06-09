function createdIntros(){var e='{{#if intros.length}}<div id="box">{{#each intros}}<div><div class="circCont"><button data-id="{{@index}}" class="removeButton circle fromMiddle"><span></span></button></div><a href="#!/{{this.key}}" class="link">{{this.title}}</a></div>{{/each}}</div>{{/if}}';this.template=Handlebars.compile(e),this.element=$("#createdIntros"),this.remove=function(e){var t=this;swal({html:!0,title:'<h2 style="font-family: StarWars;">remove intro</h2>',text:'<p style="text-align: justify">This will not remove the intro from the database. Are you sure you want to remove the intro from this browser?<br></p>',showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No",animation:"slide-from-top"},function(n){if(n){var o=JSON.parse(localStorage.StarWarsIntros);o.splice(e,1),localStorage.StarWarsIntros=JSON.stringify(o),t.load()}})},this.load=function(){var e=localStorage.StarWarsIntros?JSON.parse(localStorage.StarWarsIntros):[],t=$(this.template({intros:e})),n=this;t.find(".removeButton").click(function(e){n.remove(e.target.dataset.id)}),this.element.html(t)};var t=function(e){for(var t=["title","episode","logo","text"],n=0;n<t.length;n++){var o=e[t[n]];if(""!==o.trim())return o.slice(0,50)}};this.save=function(e,n){var o=localStorage.StarWarsIntros?JSON.parse(localStorage.StarWarsIntros):[],a=t(n);o.push({title:a,key:e}),localStorage.StarWarsIntros=JSON.stringify(o)}}function ajaxErrorFunction(e){var t=encodeURI("Hi, the website didn't work as expected. \n\n"+e);return function(){swal({html:!0,title:'<h2 style="font-family: StarWars;">an error has occured</h2>',text:'<p style="text-align: left">Something went wrong! Sorry about that! Please try again, if this error repeats please contact us: : <br><a style="color: #ffd54e;" href="mailto:brorlandi@gmail.com,nihey.takizawa@gmail.com?Subject=SWIC%20Problem&Body='+t+'" target="_blank">brorlandi@gmail.com<br> nihey.takizawa@gmail.com</a></p>',type:"error",confirmButtonText:"Ok"})}}function getInternetExplorerVersion(){var e=-1;if("Microsoft Internet Explorer"==navigator.appName){var t=navigator.userAgent,n=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");null!=n.exec(t)&&(e=parseFloat(RegExp.$1))}else if("Netscape"==navigator.appName){var t=navigator.userAgent,n=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");null!=n.exec(t)&&(e=parseFloat(RegExp.$1))}return e}function validateEmail(e){var t=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}function getOpeningFormValues(){return{intro:$("#f-intro").val(),logo:$("#f-logo").val(),episode:$("#f-episode").val(),title:$("#f-title").val(),text:$("#f-text").val(),center:$("#f-center").prop("checked")}}function isOpeningsDifferents(e,t){var n=[];return null===e||null==t||(n.push(e.intro!==t.intro),n.push(e.logo!==t.logo),n.push(e.episode!==t.episode),n.push(e.title!==t.title),n.push(e.text!==t.text),n.push(e.center!==t.center&&void 0!==t.center),n.reduce(function(e,t){return e||t},!1))}function parseSpecialKeys(e){switch(e){case"Episode7":return"AKcKeYMPogupSU_r1I_g";case"Episode8":return"AL6yNfOxCGkHKBUi54xp";default:return e}}function checkCompatibleSWFont(e){for(var t=" qwertyuiopasdfghjklzxcvbnm0123456789!$".split(""),n=e.toLowerCase().split("").filter(function(e,t,n){return n.indexOf(e)===t}),o=0;o<n.length;o++)if(t.indexOf(n[o])==-1)return!1;return!0}function saveRedirect(e){localStorage.KasselLabsRedirect=JSON.stringify(e)}function isFallback(){return location.search.indexOf("fallback")>-1}function redirectToNewWebsite(){location.assign("https://starwarsintrocreator.kassellabs.io/?ref=redirect"+location.hash)}function randomShouldRedirect(){return!0}function checkRedirect(e){if(!e||e.stage<stageNow&&!e.redirect){const t=randomShouldRedirect();var n=!1;t&&(n=!0),e={redirect:n,stage:stageNow}}const o=isFallback();o&&e.redirect&&(e={redirect:!1,stage:stageNow}),saveRedirect(e);const a=e.redirect;a&&redirectToNewWebsite()}StarWarsOpening=function(){function e(e){this.el=$(e.el),this.audio=this.el.find("audio").get(0),this.audioDefer=$.Deferred();var t=this;this.audio.oncanplaythrough=function(){t.audioDefer.resolve()},this.start=this.el.find(".start"),this.animation=this.el.find(".animation"),this.reset(),$(this.audio).bind("ended",$.proxy(function(){this.audio.currentTime=0,this.reset();var e=this.opening;$("#f-intro").val(e.intro),$("#f-logo").val(e.logo||"Star\nwars"),$("#f-episode").val(e.episode),$("#f-title").val(e.title),$("#f-text").val(e.text),$("#f-center").prop("checked",e.center||!1),$("#f-text").css("text-align",e.center?"center":"initial"),setTimeout(function(){"block"===$(".start").css("display")&&$("body").removeClass("running")},1e4)},this))}return e.prototype.reset=function(){this.start.show(),$(".pageHide").show(),this.cloned=this.animation.clone(!0),this.animation.remove(),this.animation=this.cloned,$(window).trigger("resize")},e.prototype.resetAudio=function(){this.audio.pause(),this.audio.currentTime=0},e.prototype.play=function(){this.start.hide(),$(".pageHide").hide(),unsetLoading(),$("body").removeClass("running"),$("body").addClass("running"),$("body").scrollTop(0),this.audio.play(),this.el.append(this.animation);var e=$(".titles > div",this.animation)[0];if(e.offsetHeight>1977){for(var t,n=e.offsetHeight-1977,o=.04041570438799076,a=20-n*o,r=document.styleSheets,i=0;i<r.length;++i)for(var s=0;s<r[i].cssRules.length;++s){var l=r[i].cssRules[s];"titles"==l.name&&l.type==CSSRule.KEYFRAMES_RULE&&(t=l)}t&&t.appendRule("100% { top: "+a+"% }")}},e}();var StarWars=new StarWarsOpening({el:".starwars"});CreatedIntros=new createdIntros,CreatedIntros.load(),swal.setDefaults({customClass:"star-wars-alert"});var OpeningKey=null,defaultOpening=null,audio=document.getElementsByTagName("audio")[0],audioIsLoaded=!1,loadData=function(){audioIsLoaded||(audio.load(),audioIsLoaded=!0)};document.body.addEventListener("touchstart",loadData),window.addEventListener("keydown",function(e){var t=document.activeElement.type||"";t.startsWith("text")||[32,37,38,39,40].indexOf(e.keyCode)>-1&&e.preventDefault()},!1);var notPlayed=!0,showFooter=!0;window.setLoading=function(){$("#loader").show(),$("#form-starwars").hide()},window.unsetLoading=function(){$("#loader").hide(),$("#form-starwars").show()},setLoading(),$("#form-starwars").submit(function(e){e.preventDefault();var t=getOpeningFormValues(),n=StarWars.opening;if(!isOpeningsDifferents(t,n)){var o=location.hash,a="!/"+OpeningKey;return location.hash=a,void(o!==a&&window.dispatchEvent(new Event("hashchange")))}if(!isOpeningsDifferents(t,defaultOpening))return setLoading(),void(location.hash="!/Episode8");var r=t.logo.split("\n");if(r.length>2)return void sweetAlert("Oops...","Logo can't have more than 2 lines.","warning");var i=t.intro.split("\n");if(i.length>2)return void sweetAlert("Oops...","Intro text can't have more than 2 lines.","warning");for(var s in t)if("string"==t[s]&&t[s].indexOf("??")>-1)return void sweetAlert("Oops...",'Your text can\'t contain the sequence "??", please fix it and submit again.',"error");setLoading(),$.ajax({url:"https://starwarsopeninga.firebaseio.com/openings.json",method:"POST",data:JSON.stringify(t),dataType:"json",success:function(e){var n="A"+e.name.substring(1);CreatedIntros.save(n,t),location.hash="!/"+n},error:ajaxErrorFunction("Error when creating the intro.\n\n"+JSON.stringify(t))})}),$(window).on("hashchange",function(){var e=function(e){var t=e.charAt(0);return"A"===t?(e=e.substr(1),"https://starwarsopeninga.firebaseio.com/openings/-"+e+".json"):"https://starwarsopening.firebaseio.com/openings/-"+e+".json"};$("#playBut").remove();var t=location.hash.replace("#!/","").split("/"),n=t[0],o=!1;try{o="edit"===t[1]}catch(a){}if($("body").removeClass("running"),""!=n){$("[name=custom]").val(n);try{n=parseSpecialKeys(n);var r=e(n);$.ajax({url:r,success:function(e){if(null==e)return void sweetAlert("Oops...","Introduction not found!","error");StarWars.opening=e,OpeningKey=n,$("#videoButton").show();var t=e.intro.replace(/</g,"&lt;");t=t.replace(/>/g,"&gt;"),t=t.replace(/\n/g,"<br>"),StarWars.animation.find("#intro").html(t),StarWars.animation.find("#episode").text(e.episode);var a=StarWars.animation.find("#title");checkCompatibleSWFont(e.title)&&a.addClass("SWFont"),a.text(e.title);var r=e.text.split("\n"),i=StarWars.animation.find("#text");i.text("");for(var s in r)i.append($("<p>").text(r[s]));i.css("text-align",e.center?"center":""),$("#logosvg",StarWars.animation).css("width",$(window).width()+"px"),$("#logoimg",StarWars.animation).css("width",$(window).width()+"px");var l=e.logo?e.logo:"star\nwars",d=l.split("\n"),c=d[0],u=d[1]||"";if("star\nwars"!=l.toLowerCase()){var h=$("#logosvg text",StarWars.animation);h[0].textContent=c,h[1].textContent=u;var f=c.length>u.length?c:u,p="0 0 "+200*f.length+" 500";$("#logosvg",StarWars.animation).each(function(){$(this)[0].setAttribute("viewBox",p)}),$("#logosvg",StarWars.animation).show(),$("#logoimg",StarWars.animation).hide()}else $("#logosvg",StarWars.animation).hide(),$("#logoimg",StarWars.animation).show();var g=function(){$.when(StarWars.audioDefer).then(function(){var e=StarWars.audio.buffered.end(StarWars.audio.buffered.length-1);0!=e||audioIsLoaded?(notPlayed=!1,StarWars.play()):(unsetLoading(),playbutton=$('<div class="verticalWrapper"><div class="playAudio"><button id="playBut" class="playButton" style="font-size: 80px">Play</button></div></div>'),$("body").append(playbutton),$("#playBut",playbutton).click(function(){setLoading(),playbutton.remove()}),StarWars.audio.oncanplaythrough=function(){notPlayed=!1,StarWars.play()}),o&&(StarWars.audio.currentTime=97,$("#form-starwars").show())})};document.hasFocus()?g():$(window).focus(function(){notPlayed&&g()})},error:ajaxErrorFunction("Error when try to load the intro "+n)})}catch(i){location.hash="",setLoading()}}else notPlayed?unsetLoading():(StarWars.reset(),StarWars.resetAudio());ga("send","pageview",{page:location.pathname+location.search+location.hash})}),$(document).ready(function(){return getInternetExplorerVersion()!==-1?(sweetAlert("Internet Explorer Detected","This website is not compatible with Internet Explorer, please use Chrome. Sorry for the inconvenience.","error"),void unsetLoading()):(defaultOpening=getOpeningFormValues(),window.dispatchEvent(new Event("hashchange")),void $("#f-center").change(function(){var e=$(this).is(":checked");$("#f-text").css("text-align",1==e?"center":"initial")}))});var calcTime=function(e){var t=30*(e+1),n=Math.floor(t/60),o=Math.floor(n/24),a="";return o>0&&(a+=o+" days"),o<3&&(n%=24,t%=60,n>0&&(a+=" "+n+" hours"),t>0&&(a+=" "+t+" minutes")),a},termsOfServiceText='By using this website you are agreeing to our <a style="color: #ffd54e;font-weight:bold;" href="termsOfService.html" target="_blank">Terms of Service</a>.',requestVideo=function(e,t){if(t===!1)return!1;if(!validateEmail(t))return swal.showInputError("You need to type an e-mail!"),!1;var n="https://endor.nihey.org/request?code="+OpeningKey+"&email="+t;$.ajax({url:n,type:"GET",crossDomain:!0,success:function(n){var o=n.queue;swal({html:!0,title:'<h2 style="font-family: StarWars;">video request sent</h2>',text:'<p style="text-align: justify">Your video has been queued. Your current position on the queue is <b>'+(o+1)+"</b>, which will take up to <b>"+calcTime(o)+'</b>.<br>The link to download the video will be sent to the e-mail:<br></p><span style="text-align: center; font-weight: bold">'+t+"</span>"+(e?'<p style="margin-top: 15px;text-align: justify">But as you donated, we will bump you up on the queue.  Thank you so much for supporting us! You should receive the confirmation email within a few minutes.</p>':"")+'<p style="text-align: justify;margin-top: 15px;">'+termsOfServiceText+"</p>"})},error:ajaxErrorFunction("Error when request video download.")})};$("#videoButton").click(function(){var e=getOpeningFormValues(),t=StarWars.opening;return isOpeningsDifferents(e,t)?void swal({html:!0,title:'<h2 style="font-family: StarWars;">Text modified</h2>',text:'<p style="text-align: justify">You have changed some of the text inputs. You need to play the new intro to save and request a download.',showCancelButton:!0,confirmButtonText:"Ok, play it!",confirmButtonColor:"#807300",animation:"slide-from-top"},function(e){e&&$("#form-starwars").submit()}):void $.ajax({url:"https://endor.nihey.org/status?code="+OpeningKey,crossDomain:!0,success:function(e){var t=e.queue;e.url?swal({html:!0,title:'<h2 style="font-family: StarWars;">Download</h2>',text:'<p style="text-align: left">This video has already been generated, click the link below to download.<br><br><a style="color: #ffd54e;" href="'+e.url+'">'+e.url+"</a></p>"}):swal({html:!0,title:'<h2 style="font-family: StarWars;">Donate and Download</h2>',text:'<p style="text-align: left">We want to provide videos for free, but we have to use a server to render it, which costs money.<br>There are <b>'+(t+1)+" videos</b> in front of you and it will take <b>"+calcTime(t)+'</b> to be processed.<br><br>Can\'t wait for it? Donate at least <b>5 US Dollars</b>, you will jump the queue and your video will be ready in few hours.<br>The video will be rendered in HD quality and MP4 file. To see a sample video click <a style="color: #ffd54e;font-weight:bold;" href="https://www.youtube.com/watch?v=IQf8AN07T_E" target="_blank">here</a>.Donate at least <b>10 US Dollars</b> and you will get the video in <b>Full HD resolution (1920x1080)</b><br><br><b>Attention!</b> Make sure there are no typos in your text, there will be no correction after the video rendering.<br>'+termsOfServiceText+'</p><iframe src="./atat.html" height="200px"></iframe>',showCancelButton:!0,confirmButtonText:"Yes, donate!",confirmButtonColor:"#807300",cancelButtonText:"No, I'll get in the queue!",closeOnConfirm:!1,closeOnCancel:!1,animation:!1},function(e){var t={html:!0,title:'<h2 style="font-family: StarWars;">Generate video</h2>',text:'<p style="text-align: justify">Type your email below and you will receive a message with the URL to download your video when it\'s ready. We promise not to send spam!</p>'+(e?['<br><p style="text-align: justify">',"  Please, use the same email from you PayPal account.","  If you want to receive in another e-mail too, click on download button again and add more e-mails. You don't need to donate again.","  <br><br>","  Attention! Make sure there are no typos in your text, you will need to request a new video download and donate again.<br><br>","  "+termsOfServiceText,"</p>"].join(""):""),type:"input",showCancelButton:!0,inputPlaceholder:"Your e-mail...",closeOnConfirm:!1,showLoaderOnConfirm:!0};e&&(t.title='<h2 style="font-family: StarWars;">Donate</h2>',t.text='Click on the button below:<br><iframe src="./donateButtons.html#!/'+OpeningKey+'" height="100"></iframe>'+t.text),swal(t,requestVideo.bind(window,e))})},error:ajaxErrorFunction("Error when request video information to download.")})});const stageNow=3,redirectPercentage=1,redirectActive=!0;$(document).ready(function(){var e=localStorage.KasselLabsRedirect;e=e&&JSON.parse(e),checkRedirect(e)}),document.querySelector("#btcether").addEventListener("click",function(e){e.preventDefault(),swal({title:'<h2 style="font-family: StarWars;">Donate Bitcoin and Ether</h2>',html:!0,text:'<p style="text-align: center">You can donate Bitcoins and Ether to the following Wallets. Please send us an email to tell us about your donation.</p><br><p>Bitcoin: 1KAYmrrYYobx2k6p5zxkziGeggbXqPdYJ6</p><br><p>Ether: <span style="font-size: 0.9em">0xe5c26Be15597B3b03519f2517592AE2dBdFf4E63</span>  </p>',allowOutsideClick:!1})});