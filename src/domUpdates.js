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
  },

  displayRoomsAvailable(rooms) {
    let numAvailable = rooms.length;
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`There are ${numAvailable} rooms available today.`);
  },

  displayTodaysRevenue(amount) {
    let roundedAmount =  amount.toFixed(2)
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Today's total revenue is $${roundedAmount}.`);
  },

  displayTodaysOccupancy(occupancy) {
    $('.rooms-to-book-container').html('');
    $('.message-banner').text(`Riverside Resort is ${occupancy}% occupied today.`);
  }

};

export default domUpdates;
