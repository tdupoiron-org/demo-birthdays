function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  var sqrtN = Math.sqrt(n);
  for (var i = 3; i <= sqrtN; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function listPrimes(n) {
  var primes = [];
  for (var i = 2; i <= n; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

function main() {
  var startTime = new Date().getTime();
  var primes = listPrimes(3000000);
  var endTime = new Date().getTime();
  var duration = endTime - startTime;
  console.log("Total primes found:", primes.length);
  console.log("Time duration:", duration, "ms");
}

main();

module.exports = listPrimes;