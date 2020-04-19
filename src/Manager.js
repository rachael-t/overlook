import domUpdates from './domUpdates.js'
import Fetcher from './Fetcher.js'
import User from './User.js'

class Manager extends User {
  constructor(usersData, roomsData, bookingsData) {
  super(usersData, roomsData, bookingsData);
  }

  getTodaysRevenue(date) {
    let allBookings = this.bookings.filter(booking => booking.date === date);
    let amount = allBookings.reduce((total, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          total += room.costPerNight;
        }
      })
      return total;
    }, 0);
    domUpdates.displayTodaysRevenue(amount);
    return amount;
  }
  //
  // getTodaysOccupancy(date) {
  //
  // },
  //
  // cancelBooking(date, roomNum) {
  //
  // },
}

export default Manager;
