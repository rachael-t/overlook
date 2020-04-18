import $ from 'jquery';

const domUpdates = {
  displayCustomerName(name) {
    $('#customer-welcome').text(`Welcome back ${name}!`);
  }
};

export default domUpdates;
