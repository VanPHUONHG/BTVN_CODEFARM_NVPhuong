// Thực hiện viết hàm filterEvenNumbers(arr) để lọc lấy các số chẵn từ mảng arr.

// Input:
function filterEvenNumbers(arr) {
  // buoc 1: tao mot mang rong de chua ket qua
  const row = [];
  // buoc2: dung for de duyet qua tung ptu cua mang arr
  for (let i = 0; i < arr.length; i++) {
    //   buoc 3: kiem tra xem cac so co chia het cho 2 hay khong
    if (arr[i] % 2 === 0) {
      // buoc 4: neu la so chan thi luu vao ket qua
      row.push(arr[i]);
    }
  }
  //buoc 5: sau khi kiem tra neu dung thi tra ve mang ket qua
  return row;
}

// Output:
console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6])); // Output: [2, 4, 6]
console.log(filterEvenNumbers([1, 3, 5, 7])); // Output: []
console.log(filterEvenNumbers([])); // Output: []
console.log(filterEvenNumbers([-2, -1, 0, 1, 2]));
// Output: [-2, 0, 2]
