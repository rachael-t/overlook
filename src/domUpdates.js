import $ from 'jquery';


const domUpdates = {
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
  },

  displayCustomerAmountSpent(amount) {
    let roundedAmount =  amount.toFixed(2)
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`You have spent a total of $${roundedAmount} at Riverside Resort`);
  }

};

export default domUpdates;
