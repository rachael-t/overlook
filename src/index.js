// Imports
import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import './images/robson-hatsukami-morgan-qr7tsSwDOg0-unsplash.jpg';
import utils from './utils.js';
import User from './User.js';
import Manager from './Manager.js';
import domUpdates from './domUpdates.js';

// Global variables
let customer;
let customerID;
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
$('body').on('click', '.cancel-room-btn', requestCancellation);

// Customer event liseners
$('body').on('click', '#customer-make-reservation', makeReservationHandler);
$('body').on('change', '#datepicker', reservationDateHandler);
$('body').on('change', '.room-type-selection', reservationFilterHandler);
$('body').on('click', '.book-room-btn', requestBooking);
$('body').on('click', '#customer-past-reservations', pastReservationsHandler);
$('body').on('click', '#customer-upcoming-resverations', upcomingReservationsHandler);
$('body').on('click', '#customer-total-spent', totalSpentHandler);

// Functions for entire application
function getAllData() {
  let fetchedUsersData = utils.fetchUsersData()
    .then(data => data.users);
  let fetchedRoomsData = utils.fetchRoomsData()
    .then(data => data.rooms);
  let fetchedBookingsData = utils.fetchBookingsData()
    .then(data => data.bookings);
  return Promise.all([fetchedUsersData, fetchedRoomsData, fetchedBookingsData]);
}

function createResortData(data) {
  user = new User(data[0], data[1], data[2]);
  manager = new Manager(data[0], data[1], data[2]);
}

getAllData().then(data => createResortData(data));

function getTodaysDate() {
  let fullDate = new Date();
  let twoDigitMonth = fullDate.getMonth() + 1 + "";
  let twoDigitDate = fullDate.getDate() + "";
  if (twoDigitMonth.length === 1) {
    twoDigitMonth = "0" + twoDigitMonth;
  }
  if (twoDigitDate.length === 1) {
    twoDigitDate = "0" + twoDigitDate;
  }
  let currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate
  return currentDate;
}

function logUserIn() {
  let username = $('#form-text').val();
  let password = $('#form-password').val();
  if (username === 'manager' && password === 'overlook2020') {
    domUpdates.displayUserPage(username);
    domUpdates.addNamesToUserSearch(user.users);
  } else if (username.includes('customer') && password === 'overlook2020') {
    domUpdates.displayUserPage(username);
    let customerLogin = $('#form-text').val();
    customerID = parseInt(customerLogin.slice(8));
    loadCustomerInfo(customerID);
  } else {
    alert('Incorrect username or password. Please try again.');
  }
}

function logUserOut() {
  domUpdates.displayLogout();
  searchedUserId = null;
}

// Manager page functions
function searchUserHandler() {
  user.getCustomerData(searchedUserId);
  let name = $("#customer-name-selection").val();
  let amount = manager.getCustomerAmountSpent(searchedUserId).toFixed(2);
  let allBookings = manager.getCustomerBookings(searchedUserId, today, 'all').length;
  domUpdates.displayCustomerDetails(name, allBookings, amount);
}

function roomsAvailableHandler() {
  let todaysBookings = manager.getRoomsAvailable(today);
  if (todaysBookings.length === 0) {
    domUpdates.displayFullyBookedMessage();
  }
}

function todaysRevenueHandler() {
  manager.getTodaysRevenue(today);
}

function todaysOccupationHandler() {
  manager.getTodaysOccupancy(today);
}

function cancellationPageHandler() {
  if (!searchedUserId) {
    alert('Please select a customer.');
  } else {
    let futureBookings = manager.getCustomerBookings(searchedUserId, today, 'future');
    domUpdates.displayCancellationOptions(futureBookings);
  }
}

// Customer page functions
function loadCustomerInfo(customerID) {
  customer = user.getCustomerData(customerID);
}

function makeReservationHandler() {
  domUpdates.displayDatePicker();
}

function reservationDateHandler() {
  let date = $("#datepicker").val();
  user.getRoomsAvailable(date);
}

function reservationFilterHandler() {
  let date = $("#datepicker").val();
  let roomType = $('.room-type-selection').val();
  user.filterRoomsAvailable(date, roomType);
}

function pastReservationsHandler() {
  domUpdates.resetCategoryDisplay();
  user.getCustomerBookings(customer.id, today, 'past');
}

function upcomingReservationsHandler() {
  domUpdates.resetCategoryDisplay();
  user.getCustomerBookings(customer.id, today, 'future');
}

function totalSpentHandler() {
  domUpdates.resetCategoryDisplay();
  user.getCustomerAmountSpent(customer.id);
}

// Posting and deleting handlers
function requestBooking() {
  if (!searchedUserId && !customerID) {
    alert('Please select a customer to make a reservation.');
  }
  let usersID = user.customer.id;
  let dateRequested;
  if (!$("#datepicker").val()) {
    dateRequested = today;
  } else {
    dateRequested = $("#datepicker").val()
  }
  let room = parseInt($(".book-room-btn").attr('id'));
  let reservation = utils.postReservation(usersID, dateRequested, room);
  Promise.all([reservation]).then(() => {
    alert('Reservation has been booked successfully.');
  });
}

function requestCancellation() {
  let bookingID = parseInt($('.cancel-room-btn').attr('id'));
  let cancellation = utils.cancelReservation(bookingID);
  Promise.all([cancellation]).then(() => {
    alert('Reservation has been cancelled successfully.');
  });
}
