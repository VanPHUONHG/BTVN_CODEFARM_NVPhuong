function printPrimeNumber(n) {
  for (let i = 2; i <= n; i++) {
    let math = Math.sqrt(i);
    if (Number.isInteger(math)) {
      console.log(i);
    }
  }
}
printPrimeNumber(10);
