import bookingsTestData from './bookings-test-data.js';
import chai from 'chai';
import domUpdates from '../src/domUpdates.js'
import roomsTestData from './rooms-test-data.js';
import User from '../src/User.js';
import usersTestData from './users-test-data.js';

const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

describe('User', function () {
  let user;

  beforeEach(() => {
    user = new User(usersTestData, roomsTestData, bookingsTestData);
    chai.spy.on(domUpdates, ['displayCustomerName', 'displayCustomerBookings', 'displayCustomerAmountSpent', 'displayRoomsAvailable'], () => true)
  });

  afterEach(function() {
    chai.spy.restore(domUpdates);
  });

  it('should take in all users data', function() {
    expect(user.users.length).to.equal(5);
  });

  it('should take in all rooms data', function() {
    expect(user.rooms.length).to.equal(10);
  });

  it('should take in all bookings data', function() {
    expect(user.bookings.length).to.equal(10);
  });

  it('should identify a customer by their username', function() {
    expect(user.getCustomerData(1)).to.deep.equal({
      "id": 1,
      "name": "Leatha Ullrich"
    });
    expect(domUpdates.displayCustomerName).to.have.been.called(1);
    expect(domUpdates.displayCustomerName).to.have.been.called.with("Leatha Ullrich");
  })

  it('should get all past bookings unique to a customer', function() {
    expect(user.getCustomerBookings(1, "2020/02/01", 'past')).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6td",
        "userID": 1,
        "date": "2020/01/31",
        "roomNumber": 10,
        "roomServiceCharges": []
      }
    ]);
    expect(domUpdates.displayCustomerBookings).to.have.been.called(1);
    expect(domUpdates.displayCustomerBookings).to.have.been.called.with([
      {
        "id": "5fwrgu4i7k55hl6td",
        "userID": 1,
        "date": "2020/01/31",
        "roomNumber": 10,
        "roomServiceCharges": []
      }
    ]);
  })

  it('should get all future bookings unique to a customer', function() {
    expect(user.getCustomerBookings(1, "2020/02/01", 'future')).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 6,
        "roomServiceCharges": []
      },
    ]);
    expect(domUpdates.displayCustomerBookings).to.have.been.called(1);
    expect(domUpdates.displayCustomerBookings).to.have.been.called.with([
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 6,
        "roomServiceCharges": []
      },
    ]);
  })

  it('should return the total amount spent for a customer', function() {
    expect(user.getCustomerAmountSpent(2)).to.equal(722.60);
    expect(domUpdates.displayCustomerAmountSpent).to.have.been.called(1);
    expect(domUpdates.displayCustomerAmountSpent).to.have.been.called.with(722.60);
  })

  it('should return the total rooms available for the current date', function() {
    expect(user.getRoomsAvailable("2020/02/14")).to.deep.equal([
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 3,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      },
      {
        "number": 4,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      },
      {
        "number": 5,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
      },
      {
        "number": 6,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
      {
        "number": 8,
        "roomType": "junior suite",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 261.26
      },
      {
        "number": 9,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 200.39
      },
      {
        "number": 10,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 1,
        "costPerNight": 497.64
      }
    ]);
    expect(domUpdates.displayRoomsAvailable).to.have.been.called(1);
    expect(domUpdates.displayRoomsAvailable).to.have.been.called.with([
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 3,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      },
      {
        "number": 4,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      },
      {
        "number": 5,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
      },
      {
        "number": 6,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
      {
        "number": 8,
        "roomType": "junior suite",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 261.26
      },
      {
        "number": 9,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 200.39
      },
      {
        "number": 10,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 1,
        "costPerNight": 497.64
      }
    ]);
  })

  it('should return the total rooms available for a selected date and room type', function() {
    expect(user.filterRoomsAvailable("2020/02/14", 'residential suite')).to.deep.equal([
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      }
    ]);
    expect(domUpdates.displayRoomsAvailable).to.have.been.called(2);
    expect(domUpdates.displayRoomsAvailable).to.have.been.called.with([
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      }
    ]);
  })

})
