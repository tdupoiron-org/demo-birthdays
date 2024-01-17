import math
import time

def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    sqrt_n = math.isqrt(n)
    for i in range(3, sqrt_n + 1, 2):
        if n % i == 0: return False
    return True

def list_primes(n):
    primes = []
    for i in range(2, n + 1):
        if is_prime(i): primes.append(i)
    return primes

def main():
    start_time = time.time()
    primes = list_primes(500000)
    end_time = time.time()
    duration = end_time - start_time
    print("Total primes found:", len(primes))
    print("Time duration:", duration, "seconds")

if __name__ == "__main__":
    main()