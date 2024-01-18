# demo-birthdays

This project contains scripts for generating prime numbers and interacting with a MySQL database.

## Project Structure

- `javascript/`: Contains JavaScript code.
  - `__tests__/`: Contains Jest tests for the JavaScript code.
  - `mysql/`: Contains JavaScript code for interacting with a MySQL database.
- `python/`: Contains Python code.

## JavaScript

### Prime Numbers

The `prime_numbers.js` script generates prime numbers. It exports a `listPrimes` function that takes a number `n` and returns an array of all prime numbers up to `n`.

### MySQL Database Interaction

The `mysql/` directory contains code for interacting with a MySQL database.

- `database.js`: Defines the `Database` and `UserProfiles` classes for interacting with a MySQL database and the `users` table, respectively.
- `app.js`: Uses the classes from `database.js` to fetch profiles from the `users` table.

## Python

The `prime_numbers.py` script generates prime numbers.

## Running the Tests

To run the tests for the JavaScript code, navigate to the `javascript/` directory and run `npm test`.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Links

- Project homepage: 
- Repository: 
- Issue tracker: 

## Licensing

The code in this project is licensed under MIT license.