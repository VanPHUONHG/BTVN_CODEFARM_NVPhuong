// Viết hàm biến đổi mảng các chuỗi "key:value" thành object
// Thực hiện viết hàm convertArrayToObject() để biến đổi mảng các chuỗi dạng key:value thành object

// Input:

function convertArrayToObject(array) {
  // Logic bài toán và trả về kết quả
  return array.reduce((acc, cur) => {
    const [key, value] = cur.split(":");
    acc[key] = value;
    return acc;
  }, {});
}
const arrayString = ["name:John", "age:30", "city:NY"];
const row = convertArrayToObject(arrayString);
console.log(row);
// Output:
