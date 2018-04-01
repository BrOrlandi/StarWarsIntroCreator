import swal from 'sweetalert2';

const bitcoinEther = (e) => {
  e.preventDefault();
  swal({
    title: 'donate bitcoin and ether',
    html: `<p>You can donate Bitcoins and Ether to the following Wallets. Please send us an email to tell us about your donation.</p>
    <p>Bitcoin: 1KAYmrrYYobx2k6p5zxkziGeggbXqPdYJ6</p>
    <p>Ether: 0xe5c26Be15597B3b03519f2517592AE2dBdFf4E63</p>`,
  });
};

export default bitcoinEther;