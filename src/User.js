import domUpdates from './domUpdates.js'
import Fetcher from './Fetcher.js'

class User {
  constructor(usersData, roomsData, bookingsData) {
    this.users = usersData;
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customer = null;
  }

  getCustomerData(id) {
    this.customer = this.users.find(user => user.id === id)
    domUpdates.displayCustomerName(this.customer.name)
    return this.customer;
  }
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
