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

  getCustomerBookings(id, today, period) {
    let customerBookings;
    let allBookings = this.bookings.filter(booking => booking.userID === id);
    if (period === 'past') {
      customerBookings = allBookings.filter(booking => booking.date < today)
    } else if (period === 'future') {
      customerBookings = allBookings.filter(booking => booking.date >= today)
    }
    domUpdates.displayCustomerBookings(customerBookings)
    return customerBookings;
  }

  getCustomerAmountSpent(id) {
    let allBookings = this.bookings.filter(booking => booking.userID === id);
    let amount = allBookings.reduce((total, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          total += room.costPerNight;
        }
      })
      return total;
    }, 0)
    domUpdates.displayCustomerAmountSpent(amount);
    return amount;
  }

  getRoomsAvailable(date) {
    let filteredBookings = this.bookings.filter(booking => !booking.date.includes(date));
    let roomsAvailable = filteredBookings.reduce((list, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          if (!list.includes(room)) {
            list.push(room);
          }
        }
      })
      return list;
    }, [])
    return roomsAvailable.length;
  }

  // makeCustomerBooking(date, roomNum) {
  //
  // }
}

export default User;
