// các vòng lặp: for, for..in, for..of, while, do while.

// for (let i = 0; i <= 16; i++) {
//   console.log(i);
// }

/**
 Bước 1: Khởi tạo biến đếm i
 Bước 2: Kiểm tra điều kiện
 Bước 3: Nếu điều kiện đúng, thực hiện code block. Nếu sai thì vòng lặp dừng lại
 Bước 4: Thực hiện bước nhẩy, sau đó quay lại bước 2. 
*/

function printSquare(n) {
  //in ra hinh vuong bang dau (*)
  // Voi n la do dai canh cua hinh vuon
  let Output = "";
  for (let i = 1; i < n; i++) {
    let row = "";
    for (let p = 0; p < n; p++) {
      row += "*";
    }
    Output += row + "\n";
  }
  console.log(Output);
}
printSquare(5);
