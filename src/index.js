// Imports
import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import './images/robson-hatsukami-morgan-qr7tsSwDOg0-unsplash.jpg'
import Fetcher from './Fetcher.js'
import User from './User.js'
import Manager from './Manager.js'
import domUpdates from './domUpdates.js'

// Global variables
const fetcher = new Fetcher();
let customer;
let manager;
let today = getTodaysDate();
let user;

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
$("body").on('change', "#datepicker", reservationDateHandler);
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

function createResortData(data) {
  user = new User(data[0], data[1], data[2]);
  manager = new Manager(data[0], data[1], data[2]);
}

function getTodaysDate() {
  var fullDate = new Date();
  var twoDigitMonth = fullDate.getMonth() + 1 + "";
  var twoDigitDate = fullDate.getDate() + "";
  if (twoDigitMonth.length === 1) {
    twoDigitMonth = "0" + twoDigitMonth;
  }
  if (twoDigitDate.length === 1) {
    twoDigitDate = "0" + twoDigitDate;
  }
  var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
  return currentDate;
}

function logUserIn() {
  if ($('#form-text').val() === 'manager' && $('#form-password').val() === 'overlook2020') {
    $('.landing-page').css('display', 'none');
    $('.manager-page').css('display', 'flex');
  } else if ($('#form-text').val().includes('customer') && $('#form-password').val() === 'overlook2020') {
    $('.landing-page').css('display', 'none');
    $('.customer-page').css('display', 'flex');
    let customerLogin = $('#form-text').val();
    let customerID = parseInt(customerLogin.slice(8))
    loadCustomerInfo(customerID);
  } else {
    alert('Incorrect username or password. Please try again.')
  }
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
  user.getRoomsAvailable(today);
};

function todaysRevenueHandler() {
  manager.getTodaysRevenue(today);
};

function todaysOccupationHandler() {
  manager.getTodaysOccupancy(today);
};

// Customer page
function loadCustomerInfo(customerID) {
  customer = user.getCustomerData(customerID);
}

function makeReservationHandler() {
  domUpdates.displayDatePicker();
  console.log('show rooms to make reservation')
};

function reservationDateHandler() {
  let date = $("#datepicker").val();
  user.getRoomsAvailable(date);
}


function pastReservationsHandler() {
  domUpdates.clearDatePicker();
  user.getCustomerBookings(customer.id, today, 'past')
};

function upcomingReservationsHandler() {
  domUpdates.clearDatePicker();
  user.getCustomerBookings(customer.id, today, 'future')
};

function totalSpentHandler() {
  domUpdates.clearDatePicker();
  user.getCustomerAmountSpent(customer.id)
};


getAllData().then(data => createResortData(data))
