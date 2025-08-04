// Cụ thể:

// Phương thức này nhận một hàm callback làm tham số duy nhất (bỏ qua tham số thisArg). Hàm này sẽ được gọi cho từng phần tử trong mảng.
// Hàm callback nhận vào 3 tham số: giá trị hiện tại, chỉ số của phần tử và chính mảng đó.
// Phương thức sẽ trả về một mảng mới với các giá trị được tạo từ hàm callback.
// Phương thức sẽ bỏ qua các phần tử trống (empty elements) trong mảng khi gọi callback, nhưng phần tử tương ứng trong mảng mới sẽ được giữ là empty element.
// Phương thức chỉ lặp qua các phần tử có chỉ số từ 0 đến length ban đầu của mảng (nếu mảng thay đổi trong quá trình lặp, số lần lặp không bị thay đổi).
// Yêu cầu: Không được sử dụng phương thức map() nguyên bản của JavaScript.

Array.prototype.map2 = function (callback) {
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};

// Sample 1
const arr1 = [1, 2, 3, 4, 5];
const result1 = arr1.map2((value) => value * 2);

console.log(result1); // [2, 4, 6, 8, 10]
console.log(result1.length); // 5

// Sample 2
const arr2 = [1, , , , 5]; // Có phần tử trống
const result2 = arr2.map2((value) => value * 2);

console.log(result2); // [2, , , , 10]
console.log(result2.length); // 5
