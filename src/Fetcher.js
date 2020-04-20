const fetcher = {
  fetchUsersData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
      .then(response => response.json())
  },

  fetchRoomsData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
      .then(response => response.json())
  },

  fetchBookingsData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
      .then(response => response.json())
  },

  postReservation(usersID, dateRequested, room) {
    let body = {
      'userID': usersID,
      'date': dateRequested,
      'roomNumber': room
    }
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => console.log("success", data))
      .catch(err => console.log("error", err.message))
  }


}

export default fetcher;
