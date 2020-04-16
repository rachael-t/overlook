import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import './images/robson-hatsukami-morgan-qr7tsSwDOg0-unsplash.jpg'

$('#sign-in-button').on('click', logUserIn);

function logUserIn() {
  if ($('#form-text').val() === 'manager') {
    $('.landing-page').css('display', 'none');
    $('.manager-page').css('display', 'flex');
  } else if ($('#form-text').val() === 'customer') {
    $('.landing-page').css('display', 'none');
    $('.customer-page').css('display', 'flex');
  };
}
