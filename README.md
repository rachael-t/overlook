# Overlook


## Abstract

 The Overlook project was a solo project during Module 2 at [Turing School of Software & Design](https://turing.io/).

 For this project, I was tasked with building a resort management tool (Riverside Resort) for customers and management to manage room bookings and determine total amounts spent/revenue generated at the resort.

 All users arrive at the same login page, and based on their login credentials, they are either taken to the manager page view or the customer page view.

 Managers are able to view the resort's availability for the day, the day's revenue, and the percentage of rooms occupied for the day. Additionally, they are able to select a loyal customer and make any necessary cancellations on their behalf, or book a same day reservation.

 Customers are able to view their past reservations, upcoming reservations, and the total amount they've spent at the resort. Customers are also able to make a reservation and search for rooms available based on their date and room type preference.

 Both users are able to logout and be taken back to the initial login screen.  

## Setup

1. Fork this repository.

2. Clone your forked repository.

3. Change into the directory and install the project dependencies by running `npm install`

4. Check that it is setup correctly by entering `run npm test` in your terminal. All tests should be passing.

5. In your terminal, run `npm start` and then navigate to `http://localhost:8080/` in your browser.

6. To log in as a customer, use username: customer[1 - 50] (for example: customer33) and password: overlook2020

7. To log in as a manager, use username: manager and password: overlook2020


## Deployed Website

* [Riverside Resort](http://rachael-t.github.io/riverside-resort)

## Technologies Used

* JavaScript
* jQuery
* fetch API
* Mocha
* Chai
* Webpack
* Sass (SCSS)


## Project Images / Gifs

![login-page](https://user-images.githubusercontent.com/54180641/79929165-30198000-8402-11ea-88d1-8aa407a4fe6a.gif)

![manager-page](https://user-images.githubusercontent.com/54180641/79929178-3ad41500-8402-11ea-91ec-c6776326b9d3.gif)

![customer-page](https://user-images.githubusercontent.com/54180641/79929235-66ef9600-8402-11ea-9be1-b4efd23306f3.gif)


## Learning Goals

* Use OOP to drive the design of the application and the code

* Work with an API to send and receive data

* Solidify the code review process

* Create a robust test suite that thoroughly tests all functionality of a client-side application

## Future Iterations

* Add functionality for the resort manager to book a customer a reservation outside of the current day. (GitHub Issue #30)

* Sort all past and upcoming bookings for a customer in descending order. (GitHub Issue #32)

* After a customer/manager has booked/cancelled a reservation, the updated data should be retrieved from the API and loaded back into the application seamlessly so that the customer/manager has the most up-to-date data. (GitHub Issue #33)


## Contributor

* [Rachael Thomas](https://github.com/rachael-t)
