// Viết hàm tìm phần tử cùng đồng thời xuất hiện ở 2 mảng
// Thực hiện viết hàm findCommonElement(arr1, arr2) để tìm các phần tử cùng đồng thời xuất hiện ở 2 mảng.

// Nếu phần tử đó xuất hiện 2 lần ở trong cùng 1 mảng thì chỉ tính là 1 lần.
// Nếu không tìm được phần tử nào thì in ra "false".
// Input:
function findCommonElement(arr1, arr2) {
  // buoc 1: tao mang rog de chua ket qua
  const row = [];
  // buoc 2: dung for de duyet tung phan tu trong arr1
  for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i];

    //dung arr2.includes(item) de kiem tra xem item cos trong arr2 hay khong
    if (arr2.includes(item) && !row.includes(item)) {
      row.push(item);
    }
  }

  //in ra ket qua
  if (row.length > 0) {
    console.log(...row);
  } else {
    console.log(false);
  }
}

// Output:
console.log(findCommonElement([1, 2, 3], [2, 3, 4])); // 2 3
console.log(findCommonElement([1, 2, 3], [4, 5, 6])); // false
console.log(findCommonElement([1, 2, 2, 3, 4], [2, 3, 4, 5])); // 2 3 4
