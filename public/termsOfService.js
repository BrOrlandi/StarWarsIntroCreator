function termsOfService(){

    this.show = function(e){
        var that = this;
        swal({
            html: true,
            title: '<h2 style="font-family: StarWars;">Terms of use</h2>',
            text: '<iframe src="./termsOfService.html" style="max-height:400px; width: 100%;"></iframe>',
              confirmButtonText: "Close",
              animation: "slide-from-top"
        });
    };

    var that = this;
    $('#termsOfServiceButton').click(function(e){
        e.preventDefault();
        that.show();
    });
};

TermsOfService = new termsOfService();
