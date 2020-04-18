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

  getCustomerBookings(id) {
    let customerBookings = this.bookings.filter(booking => booking.userID === id);
    domUpdates.displayCustomerBookings(customerBookings)
    return customerBookings;
  }

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
