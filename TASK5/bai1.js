function printPrimeNumber(n) {
  if (isNaN(n)) {
    console.log("vui long nhap dung:");
    return;
  }
  for (let i = 2; i <= n; i++) {
    let math = Math.sqrt(i);
    if (Number.isInteger(math)) {
      console.log(i);
    }
  }
}

let input = Number(prompt("Nguoi dung nhap n:"));
printPrimeNumber(input);
