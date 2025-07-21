// Thực hiện viết hàm filterLongStrings(arr) để lọc lấy các chuỗi có độ dài lớn hơn 5 từ mảng arr.
// Input:
function filterLongStrings(arr) {
  //  buoc 1: tao ra mang rong de chua ket qua
  const row = [];
  // buoc 2: dung for de duyet qua tung ptu cua mang arr
  for (let i = 0; i < arr.length; i++) {
    // buoc 3: kiem tra cacs chuoi co do dai lon hon 5 tu mang
    if (arr[i].length > 5) {
      row.push(arr[i]);
    }
  }
  return row;
}

// Output:
console.log(filterLongStrings(["hello", "world", "javascript", "nodejs"]));
// Output: ["javascript", "nodejs"]
console.log(filterLongStrings(["hi", "hello world", "a b c", "goodbye!!"]));
// Output: ["hello world", "goodbye!!"]
console.log(filterLongStrings(["hi", "bye", "yes"]));
// Output: []
