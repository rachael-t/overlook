import domUpdates from './domUpdates.js'
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

  getTodaysOccupancy(date) {
    let roomsAvailable = this.getRoomsAvailable(date);
    let numRoomsBooked = this.rooms.length - roomsAvailable.length;
    let occupancy = Math.round((numRoomsBooked / this.rooms.length) * 100);
    domUpdates.displayTodaysOccupancy(occupancy);
    return occupancy;
  }

}

export default Manager;
