// Imports
import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import './images/robson-hatsukami-morgan-qr7tsSwDOg0-unsplash.jpg'
import fetcher from './fetcher.js'
import User from './User.js'
import Manager from './Manager.js'
import domUpdates from './domUpdates.js'

// Global variables
let customer;
let manager;
let searchedUserId;
let today = getTodaysDate();
let user;

// Event listeners
$('body').on('click', '#sign-in-button', logUserIn);
$('body').on('click', '.logout-btn', logUserOut);

  // Manager page event listners
$('#customer-name-selection').change(function() {
  let grabbedId = $(this).children(':selected').attr('id');
  searchedUserId = parseInt(grabbedId);
  });
$('body').on('click', '#customer-search-button', searchUserHandler);
$('body').on('click', '#manager-rooms-available', roomsAvailableHandler);
$('body').on('click', '#manager-todays-revenue', todaysRevenueHandler);
$('body').on('click', '#manager-todays-occupation', todaysOccupationHandler);
$('body').on('click', '#manager-cancellation', cancellationPageHandler);

  // Customer event liseners
$('body').on('click', '#customer-make-reservation', makeReservationHandler);
$('body').on('change', '#datepicker', reservationDateHandler);
$('body').on('change', '.room-type-selection', reservationFilterHandler);
$('body').on('click', '.book-room-btn', requestBooking);
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
    domUpdates.addNamesToUserSearch(user.users)
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
function searchUserHandler() {
  user.getCustomerData(searchedUserId);
  let name = $("#customer-name-selection").val();
  let amount = manager.getCustomerAmountSpent(searchedUserId).toFixed(2);
  let allBookings = manager.getCustomerBookings(searchedUserId, today, 'all').length;
  domUpdates.displayCustomerDetails(name, allBookings, amount);
  domUpdates.addCancellationToMenuBar();
};

function roomsAvailableHandler() {
  manager.getRoomsAvailable(today);
};

function todaysRevenueHandler() {
  manager.getTodaysRevenue(today);
};

function todaysOccupationHandler() {
  manager.getTodaysOccupancy(today);
};

function cancellationPageHandler() {
  let futureBookings = manager.getCustomerBookings(searchedUserId, today, 'future');
  domUpdates.displayCancellationOptions(futureBookings);
};

// Customer page
function loadCustomerInfo(customerID) {
  customer = user.getCustomerData(customerID);
};

function makeReservationHandler() {
  domUpdates.displayDatePicker();
};

function reservationDateHandler() {
  let date = $("#datepicker").val();
  user.getRoomsAvailable(date);
};

function reservationFilterHandler() {
  let date = $("#datepicker").val();
  let roomType = $('.room-type-selection').val();
  user.filterRoomsAvailable(date, roomType);
};

function pastReservationsHandler() {
  domUpdates.resetCategoryDisplay();
  user.getCustomerBookings(customer.id, today, 'past')
};

function upcomingReservationsHandler() {
  domUpdates.resetCategoryDisplay();
  user.getCustomerBookings(customer.id, today, 'future')
};

function totalSpentHandler() {
  domUpdates.resetCategoryDisplay();
  user.getCustomerAmountSpent(customer.id)
};

function requestBooking() {
  let usersID = user.customer.id
  let dateRequested;
  if (!$("#datepicker").val()) {
    dateRequested = today;
  } else {
    dateRequested = $("#datepicker").val()
  }
  let room = parseInt($(".book-room-btn").attr('id'));
  fetcher.postReservation(usersID, dateRequested, room);
  alert('Reservation has been booked successfully.');
}

getAllData().then(data => createResortData(data))
