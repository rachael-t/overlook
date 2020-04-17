// Imports
import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import './images/robson-hatsukami-morgan-qr7tsSwDOg0-unsplash.jpg'
import Fetcher from './Fetcher.js'

// Global variables
const fetcher = new Fetcher();

// Event listeners
$('body').on('click', '#sign-in-button', logUserIn);
$('body').on('click', '.logout-btn', logUserOut);
  // Manager page event listners
$('body').on('click', '#customer-search-button', searchUserInfo);
$('body').on('click', '#manager-rooms-available', roomsAvailableHandler);
$('body').on('click', '#manager-todays-revenue', todaysRevenueHandler);
$('body').on('click', '#manager-todays-occupation', todaysOccupationHandler);
  // Customer event liseners
$('body').on('click', '#customer-make-reservation', makeReservationHandler);
$('body').on('click', '#customer-past-reservations', pastReservationsHandler);
$('body').on('click', '#customer-upcoming-resverations', upcomingReservationsHandler);
$('body').on('click', '#customer-total-spent', totalSpentHandler);

// Functions
function getAllData() {
  let fetchedUsersData = fetcher.fetchUsersData()
    .then(data => data.users);

  let fetchedRoomsData = fetcher.fetchRoomsData()
    .then(data => data.rooms);

  let fetchedBookingsData = fetcher.fetchBookingsData()
    .then(data => data.bookings);

  return Promise.all([fetchedUsersData, fetchedRoomsData, fetchedBookingsData]);
}

function logUserIn() {
  if ($('#form-text').val() === 'manager') {
    $('.landing-page').css('display', 'none');
    $('.manager-page').css('display', 'flex');
  } else if ($('#form-text').val() === 'customer') {
    $('.landing-page').css('display', 'none');
    $('.customer-page').css('display', 'flex');
    testDisplayRoomCard();
  };
};

function logUserOut() {
  $('.landing-page').css('display', 'flex');
  $('.manager-page').css('display', 'none');
  $('.customer-page').css('display', 'none');
};

// Manager page

function searchUserInfo() {
  console.log('Searched user info should appear')
};

function roomsAvailableHandler() {
  //call method to determine # rooms available
  // have domUpdates display that #
  console.log('# rooms available')
};

function todaysRevenueHandler() {
  //call method to determine the day's total revenue
  // have domUpdates display that #
  console.log('total revenue')
};

function todaysOccupationHandler() {
  //call method to determine the day's total occupation
  // have domUpdates display that #
  console.log('total occupancy')
};

// Customer page

function makeReservationHandler() {
  //call method to determine rooms available
  // have domUpdates display that info
  // also need to display buttons to filter rooms
  console.log('show rooms to make reservation')
};

function pastReservationsHandler() {
  //call method to determine previous reservations
  // have domUpdates display that info
  console.log('show previous reservation info')
};

function upcomingReservationsHandler() {
  //call method to determine upcoming reservations
  // have domUpdates display that #
  console.log('show upcoming reservation info')
};

function totalSpentHandler() {
  //call method to determine the total spent for a user
  // have domUpdates display that #
  console.log('total spent')
};

// this will move and is just a test to make sure the card template for a room looks okay before adding in data and moving over to domUpdates file
function testDisplayRoomCard() {
  $('.rooms-to-book-container').prepend(
  `
      <li class="room-card" id="">
        <p class="room-card-title" id="">Room Name</p>
        <div class="room-card-details-container">
            <p class="room-card-details">Room Type: residential suite</p>
            <p class="room-card-details">Does it Have a Bidet: true</p>
            <p class="room-card-details">Bed Size: queen</p>
            <p class="room-card-details">Number of Beds: 1</p>
            <p class="room-card-details">Cost Per Night: $358.4</p>
            <button type="submit" name="button" class="book-room-btn">Book Room
            </button>
        </div>
      </li>
  `)
}







getAllData().then(data => console.log(data[2]))
