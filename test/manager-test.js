import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import Manager from '../src/Manager.js'
import usersTestData from './users-test-data.js';
import roomsTestData from './rooms-test-data.js';
import bookingsTestData from './bookings-test-data.js';


describe('Manager', function () {
  let manager;
  beforeEach(() => {
    manager = new Manager(usersTestData, roomsTestData, bookingsTestData);
  });

  it('should take in all users data', function() {
    expect(manager.users.length).to.equal(5);
  });

  it('should take in all rooms data', function() {
    expect(manager.rooms.length).to.equal(10);
  });

  it('should take in all bookings data', function() {
    expect(manager.bookings.length).to.equal(10);
  });

  it('should calculate the total revenue for today', function() {
    expect(manager.getTodaysRevenue("2020/02/14")).to.equal(231.46);
  });

})
