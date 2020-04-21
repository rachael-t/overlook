import $ from 'jquery';
import flatpickr from "flatpickr";

const domUpdates = {
  addDatePicker() {
    flatpickr("#datepicker", {
      dateFormat: "Y/m/d",
      minDate: "today"
    });
  },

  displayDatePicker() {
    $('.customer-filter-date').html('');
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Please select a date:`);
    $('.customer-filter-date').prepend(`<input class="customer-select-date" id="datepicker" placeholder="Select Date" aria-label="Select a date from the calendar dropdown"/>`);
    this.addDatePicker();
  },

  resetCategoryDisplay() {
    $('.message-banner').html('');
    $('.customer-filter-date').html('');
    $('.customer-filter-options').html('');
  },

  displayCustomerName(name) {
    $('.message-banner').text(`Welcome back ${name}!`);
  },

  displayCustomerBookings(bookings) {
    $('.message-banner').html('');
    $('.rooms-to-book-container').html('');
    bookings.forEach(booking => {
      $('.rooms-to-book-container').append(
        `
          <li class="room-card" id="${booking.id}">
            <p class="room-card-title">Room ${booking.roomNumber}</p>
            <div class="room-card-details-container">
                <p class="room-card-details">Date of Reservation:</br>${booking.date}</p>
            </div>
          </li>
      `)
    });
    if (bookings.length === 0) {
      $('.message-banner').text(`You do not have any reservations for this time period.`);
    }
  },

  displayCustomerAmountSpent(amount) {
    let roundedAmount = amount.toFixed(2)
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`You have spent a total of $${roundedAmount} at Riverside Resort`);
  },

  displayRoomsAvailable(rooms) {
    let numAvailable = rooms.length;
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`There are ${numAvailable} rooms available.`);
    rooms.forEach(room => {
      $('.rooms-to-book-container').append(
        `
            <li class="room-card">
              <p class="room-card-title">Room ${room.number}</p>
              <div class="room-card-details-container">
                  <p class="room-card-details">Room Type: ${room.roomType}</p>
                  <p class="room-card-details">Does it Have a Bidet: ${room.bidet}</p>
                  <p class="room-card-details">Bed Size: ${room.bedSize}</p>
                  <p class="room-card-details">Number of Beds: ${room.numBeds}</p>
                  <p class="room-card-details">Cost Per Night: $${room.costPerNight}</p>
                  <button type="submit" name="button" class="book-room-btn" id="${room.number}">Book Room
                  </button>
              </div>
            </li>
        `
      )
    });
    this.displayFilterOptions();
    if (rooms.length === 0) {
      this.resetCategoryDisplay();
      $('.message-banner').text(`We sincerely apologize, we do not have anything matching those selections available. Please choose a different date and/or room type. Thank you.`);
    }
  },

  displayFullyBookedMessage() {
    $('.message-banner').html(``);
    $('.message-banner').text(`Riverside Resort is fully booked today!`);
  },

  displayFilterOptions() {
    $('.customer-filter-options').html('');
    $('.customer-filter-options').prepend(`
      <label>Filter by Room Type:</label>
      <select class='room-type-selection' list='room-types' placeholder='Room Options' aria-label='Select a room type'>
        <option disabled='' selected='' value=''>Room Options</option>
        <option value='residential suite'>residential suite</option>
        <option value='suite'>suite</option>
        <option value='single room'>single room</option>
        <option value='junior suite'>junior suite</option>
      </select>
      `)
  },

  displayTodaysRevenue(amount) {
    let roundedAmount = amount.toFixed(2)
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Today's total revenue is $${roundedAmount}.`);
  },

  displayTodaysOccupancy(occupancy) {
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Riverside Resort is ${occupancy}% occupied today.`);
  },

  addNamesToUserSearch(customerList) {
    customerList.forEach(customer => {
      $('#customer-name-selection').append(`<option class="name-list" id="${customer.id}" value="${customer.name}">${customer.name}</option>`)
    });
  },

  displayCustomerDetails(name, allBookings, amount) {
    $('.message-banner').text(`${name}'s Profile: ${allBookings} reservations made and $${amount} spent`);
  },

  displayCancellationOptions(bookings) {
    $('.message-banner').html('');
    $('.rooms-to-book-container').html('');
    bookings.forEach(booking => {
      $('.rooms-to-book-container').append(
        `
          <li class="room-card" id="${booking.id}">
            <p class="room-card-title">Room ${booking.roomNumber}</p>
            <div class="room-card-details-container">
                <p class="room-card-details">Date of Reservation:</br>${booking.date}</p>
                <button type="submit" name="button" class="cancel-room-btn" id="${booking.id}">Cancel Reservation
                </button>
            </div>
          </li>
      `)
    })
    if (bookings.length === 0) {
      $('.message-banner').text(`This customer does not have any upcoming reservations.`);
    }
  },

  displayLogout() {
    $('.landing-page').css('display', 'flex');
    $('.manager-page').css('display', 'none');
    $('.customer-page').css('display', 'none');
    $('.rooms-to-book-container').html('');
    $('#customer-name-selection').val('');
    $('#datepicker').val('');
    $('#form-password').val('');
    $('#form-text').val('');
    this.resetCategoryDisplay();
  },

};
export default domUpdates;
