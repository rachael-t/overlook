import bookingsTestData from './bookings-test-data.js';
import chai from 'chai';
import domUpdates from '../src/domUpdates.js'
import Manager from '../src/Manager.js'
import roomsTestData from './rooms-test-data.js';
import User from '../src/User.js';
import usersTestData from './users-test-data.js';

const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

describe('Manager', function () {
  let manager;

  beforeEach(() => {
    manager = new Manager(usersTestData, roomsTestData, bookingsTestData);
    chai.spy.on(domUpdates, ['displayTodaysRevenue', 'displayRoomsAvailable', 'displayTodaysOccupancy'], () => true)
  });

  afterEach(function() {
    chai.spy.restore(domUpdates);
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
    expect(domUpdates.displayTodaysRevenue).to.have.been.called(1);
    expect(domUpdates.displayTodaysRevenue).to.have.been.called.with(231.46);
  });

  it('should calculate the total occupancy for today', function() {
    expect(manager.getTodaysOccupancy("2020/02/14")).to.equal(10);
    expect(domUpdates.displayTodaysOccupancy).to.have.been.called(1);
    expect(domUpdates.displayTodaysOccupancy).to.have.been.called.with(10);
  });

})
