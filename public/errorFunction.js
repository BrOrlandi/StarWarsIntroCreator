function ajaxErrorFunction(bodyMessage){
    var body = encodeURI("Hi, the website didn't work as expected. \n\n"+bodyMessage);
    return function (){
        swal({
            html: true,
            title: '<h2 style="font-family: StarWars;">an error has occured</h2>',
            text: '<p style="text-align: left">Something went wrong! Sorry about that! Please try again, if this error repeats please contact us: : '+
            '<br><a style="color: #ffd54e;" href="mailto:brorlandi@gmail.com,nihey.takizawa@gmail.com?Subject=SWIC%20Problem&Body='+body+'" target="_blank">brorlandi@gmail.com<br> nihey.takizawa@gmail.com</a></p>',
            type: "error",
            confirmButtonText: "Ok"
        });
    }
}