import domUpdates from './domUpdates.js'
import Fetcher from './Fetcher.js'

class User {
  constructor(usersData, roomsData, bookingsData, id) {
    this.users = usersData;
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customer = null;
  }

  // getCustomerData(id) {
  //
  // },
  //
  // getCustomerBookings(id) {
  //
  // },
  //
  // getCustomerAmountSpent(id) {
  //
  // },
  //
  // makeCustomerBooking(date, roomNum) {
  //
  // },
  //
  // getRoomsAvailable(date) {
  //
  // },
}

export default User;
