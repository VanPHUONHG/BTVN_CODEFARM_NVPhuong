// Viết hàm tìm số lớn thứ 2 trong mảng
// Thực hiện viết hàm findSecondLargestNumber(arr) để tìm số lớn thứ 2 trong mảng.
// Nếu không có số lớn thứ 2 hoặc mảng không có phần tử nào thì trả về -1.
// Input:
function findSecondLargestNumber(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return ;
  }
  //luu so lon nhat
  let max = -Infinity;
  //luu so lon hon 2
  let max2 = -Infinity;

  //Buoc 2: tim so lon nhat va tim so lon thu 2 nho hon max
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== max && arr[i] > max2) {
      max2 = arr[i];
    }
  }
  //buoc 3: neu khong co so lon hon 2 thi tra ve false
  if (max2 === -Infinity) {
    return null;
  }
  return max2;
}

// Output:
console.log(findSecondLargestNumber([1, 2, 3, 4, 5])); // 4
console.log(findSecondLargestNumber([1, 1, 1])); // -1
console.log(findSecondLargestNumber([1])); // -1
