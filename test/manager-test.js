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

  describe('See if the tests are running', function() {
    it('should return true', function() {
      expect(true).to.equal(true);
    });
  });

})
