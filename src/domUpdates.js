import $ from 'jquery';
import flatpickr from "flatpickr";

const domUpdates = {
  addDatePicker() {
    flatpickr("#datepicker", {
      dateFormat: "Y/m/d"
    });
  },

  displayDatePicker() {
    $('.customer-filter-date').html('');
    $('.message-banner').text(`Please select a date:`);
    $('.customer-filter-date').prepend(`<input class="customer-select-date" id="datepicker" placeholder="Select Date"/>`);
    this.addDatePicker();
  },

  clearDatePicker() {
    $('.message-banner').html('');
    $('.customer-filter-date').html('');
  },

  displayCustomerName(name) {
    $('.message-banner').text(`Welcome back ${name}!`);
  },

  displayCustomerBookings(bookings) {
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
    })
    if (bookings.length === 0) {
      $('.message-banner').text(`You do not have any upcoming reservations.`);
    }
  },

  displayCustomerAmountSpent(amount) {
    let roundedAmount =  amount.toFixed(2)
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
            <li class="room-card" id="${room.number}">
              <p class="room-card-title">Room ${room.number}</p>
              <div class="room-card-details-container">
                  <p class="room-card-details">Room Type: ${room.roomType}</p>
                  <p class="room-card-details">Does it Have a Bidet: ${room.bidet}</p>
                  <p class="room-card-details">Bed Size: ${room.bedSize}</p>
                  <p class="room-card-details">Number of Beds: ${room.numBeds}</p>
                  <p class="room-card-details">Cost Per Night: $${room.costPerNight}</p>
                  <button type="submit" name="button" class="book-room-btn">Book Room
                  </button>
              </div>
            </li>
        `
      )
    })
  },

  displayTodaysRevenue(amount) {
    let roundedAmount =  amount.toFixed(2)
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Today's total revenue is $${roundedAmount}.`);
  },

  displayTodaysOccupancy(occupancy) {
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Riverside Resort is ${occupancy}% occupied today.`);
  },

};

export default domUpdates;

//Room Card:

// $('.rooms-to-book-container').prepend(
// `
//     <li class="room-card" id="">
//       <p class="room-card-title" id="">Room Name</p>
//       <div class="room-card-details-container">
//           <p class="room-card-details">Room Type: residential suite</p>
//           <p class="room-card-details">Does it Have a Bidet: true</p>
//           <p class="room-card-details">Bed Size: queen</p>
//           <p class="room-card-details">Number of Beds: 1</p>
//           <p class="room-card-details">Cost Per Night: $358.4</p>
//           <button type="submit" name="button" class="book-room-btn">Book Room
//           </button>
//       </div>
//     </li>
// `)
// }
