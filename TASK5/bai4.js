function printChristmasTree(n, character) {
  if (!Number.isInteger(n) || n <= 0 || n >= 100) {
    console.log("n là số nguyên dương nhỏ hơn 100");
    return;
  }
  if (typeof character !== "string" || character.length !== 1) {
    console.log("character là một ký tự.");
    return;
  }
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let q = 0; q < n - i; q++) {
      row += " ";
    }
    for (let p = 0; p < 2 * i + 1; p++) {
      row += character;
    }
    console.log(row);
  }
  let vegatable = "";
  for (let i = 0; i <= n - 1; i++) {
    vegatable += " ";
  }
  vegatable += character;
  1;
  console.log(vegatable);
}
let inputN = parseInt(prompt("Nhập chiều cao cây thông (số nguyên < 100):"));
let inputChar = prompt("Nhập ký tự dùng để vẽ cây thông:");

printChristmasTree(inputN, inputChar);
