// Input:
function printPrimeNumber(n) {
  // Xử lý và in ra kết quả
  if (typeof n !== "number" || Number.isNaN(n)) {
    console.log("vui long nhap chinh xac");
    return;
  }
  for (let i = 2; i <= n; i++) {
    // check i co phai la so nguyeen to khong
    // co -> tim cach in ra i
    if (checkPrime(i)) {
      console.log(i);
    }
  }
}

function checkPrime(x) {
  // nếu x là số nguyên tố => true
  // ngược lại là false
  // kiểm tra xem từ 2 đến x, thì có số nào mà x chia hêt k
  for (let j = 2; j <= Math.sqrt(x); j++) {
    if (x % j === 0) {
      return false;
    }
  }
  return true;
}
let input = Number(prompt("vui long nhap n:"));
// console.log(checkPrime(6));

// Output:
printPrimeNumber(input); // 2 3 5 7

/**
 Buoc1: kiểm tra số đó trong khoảng từ 2 đến n
 Buoc 2: Kiểm tra số đó có phải là số nguyên tố
*/
