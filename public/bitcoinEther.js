document.querySelector('#btcether').addEventListener("click", function(e) {
    e.preventDefault();
    swal({
      title: '<h2 style="font-family: StarWars;">Donate Bitcoin and Ether</h2>',
      html: true,
      text:'<p style="text-align: center">You can donate Bitcoins and Ether to the following Wallets. Please send us an email to tell us about your donation.</p>'+
          '<br><p>Bitcoin: 1KAYmrrYYobx2k6p5zxkziGeggbXqPdYJ6</p>' +
          '<br><p>Ether: <span style="font-size: 0.9em">0xe5c26Be15597B3b03519f2517592AE2dBdFf4E63</span>  </p>',
      allowOutsideClick: false,
    });
  });