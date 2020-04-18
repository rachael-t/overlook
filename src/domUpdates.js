import $ from 'jquery';


const domUpdates = {
  displayCustomerName(name) {
    $('#customer-welcome').text(`Welcome back ${name}!`);
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
  }

};

export default domUpdates;
