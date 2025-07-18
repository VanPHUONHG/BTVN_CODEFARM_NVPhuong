// // bai 1
// function printSquare(n) {
//   for (let i = 1; i <= n; i++) {
//     let row = "";
//     for (let p = 1; p <= i; p++) {
//       row += "*";
//     }
//     console.log(row);
//   }
// }
// printSquare(5);

// bai 2

function printSquare(n, char) {
  let output = "";
  for (let i = 1; i <= n; i++) {
    let row = " ";
    for (let j = 0; j < n - i; j++) {
      row += " ";
    }
    for (let p = 1; p <= 2 * i - 1; p++) {
      row += char;
    }
    console.log(row);
  }
}
let useChar = prompt("Nhap ky tu ban muon");
let inputLength = Number(prompt("nhap so dong"));
printSquare(inputLength, useChar);
