function insertNumber(arr, num) {
  let row = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    // Kiểm tra item có phải là số và không phải NaN
    if (typeof item === "number" && !isNaN(item)) {
      row.push(item);
    }
  }
  // Bước 2: Sắp xếp mảng tăng dần
  row.sort(function (a, b) {
    return a - b;
  });
  // Bước 3: Kiểm tra num có phải là số hợp lệ không
  //   if (typeof num !== "number" && !isNaN(num)) {
  //     return row;
  //   }
  //   Bước 4: Chèn đúng vị trí
  let inserted = false;
  for (let i = 0; i < row.length; i++) {
    if (num < row[i]) {
      row.splice(i, 0, num);
      inserted = true;
      break;
    }
  }
  // Nếu num lớn hơn tất cả phần tử, thêm vào cuối
  if (!inserted && typeof num === "number" && Number.isFinite(num)) {
    row.push(num);
  }
  return row;
}

// Output:
console.log(insertNumber([1, 3, 5, 7, 9], 6));
// Output: [1, 3, 5, 6, 7, 9]
console.log(insertNumber([3, "hello", 1, NaN, 4, null], 2));
// Output: [1, 2, 3, 4]
console.log(insertNumber([], 5));
// Output: [5]
console.log(insertNumber([-1, 10, -5, "abc"], -3));
// Output: [-5, -3, -1, 10]
console.log(insertNumber([5, 2, 8], NaN));
// Output: [2, 5, 8]
