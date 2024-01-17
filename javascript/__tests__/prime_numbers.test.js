// FILEPATH: /workspaces/demo-birthdays/javascript/prime_numbers.test.js
const listPrimes = require('../prime_numbers');

test('listPrimes returns correct primes for n=10', () => {
  expect(listPrimes(10)).toEqual([2, 3, 5, 7]);
});

test('listPrimes returns correct primes for n=20', () => {
  expect(listPrimes(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
});

test('listPrimes returns an empty array for n=1', () => {
  expect(listPrimes(1)).toEqual([]);
});

test('listPrimes returns correct primes for n=2', () => {
  expect(listPrimes(2)).toEqual([2]);
});