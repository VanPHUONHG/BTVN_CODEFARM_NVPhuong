function cleanFalsyValues(arr) {
  //bước 1: tạo hàm và mảng trả về kết quả
  const row = [];
  //bước 2: dùng vòng lặp for để duyệt qua các mảng.
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      //Buoc 3: kiem tra xem co dung la rpw k, hàm chỉ thêm vào khi trả về là ham row
      row.push(arr[i]);
    }
  }
  return row;
}

// Output:
console.log(cleanFalsyValues([1, 0, "", null, "hello", undefined, NaN, 2, 3]));
// Output: [1, "hello", 2, 3]
