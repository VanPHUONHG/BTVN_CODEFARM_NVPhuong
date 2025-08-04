// Xoá các phần tử trùng lặp
// Viết hàm removeDuplicate(arr) xoá phần tử trùng lặp trong mảng arr và trả về mảng mới không chứa phần tử trùng lặp.

// Khuyến khích sử dụng reduce() để giải quyết bài toán.
// Với NaN, nếu có nhiều hơn 1 NaN thì chỉ giữ lại 1 NaN.
// Với null, nếu có nhiều hơn 1 null thì chỉ giữ lại 1 null.
// Với undefined, nếu có nhiều hơn 1 undefined thì chỉ giữ lại 1 undefined.
// Input:
const fruits = [
  "apple",
  "banana",
  "kiwi",
  "kiwi",
  "banana",
  "orange",
  "apple",
  "kiwi",
];

function removeDuplicate(arr) {
  return arr.reduce((acc, cur) => {
    let result = false;
    for (let i = 0; i < acc.length; i++) {
      const item = acc[i];
      if (item === cur) {
        result = true;
        break;
      }

      if (typeof item === "string" && typeof cur === "number") {
        if (isNaN(item) && isNaN(cur)) {
          result = true;
          break;
        }
      }
    }
    if (!result) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// Output:
const result = removeDuplicate(fruits);
console.log(result); // ["apple", "banana", "kiwi", "orange"]
