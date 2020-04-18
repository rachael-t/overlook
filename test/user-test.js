import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import usersTestData from './users-test-data.js';
import roomsTestData from './rooms-test-data.js';
import bookingsTestData from './bookings-test-data.js';


describe('User', function () {
  let user;
  beforeEach(() => {
    user = new User(usersTestData, roomsTestData, bookingsTestData);
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


})
