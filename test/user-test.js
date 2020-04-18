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
    chai.spy.on(domUpdates, ['displayCustomerName'], () => true)
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


})
