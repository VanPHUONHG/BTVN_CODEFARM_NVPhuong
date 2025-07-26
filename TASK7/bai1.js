// Viết hàm checkSymmetricalArr(arr) để kiểm tra mảng có đối xứng hay không?
// Mảng đối xứng là mảng mà đọc từ trái sang phải hay từ phải sang trái đều giống nhau.
// Ví dụ: [1, 2, 3, 4, 3, 2, 1], [1, 2, 3, 3, 2, 1], [1, 2, 3, 2, 1] là mảng đối xứng.
// Nếu mảng nhập vào chỉ có 1 phần tử, báo là Mảng có 1 phần tử, không kiểm tra được.
// Nếu dữ liệu nhập vào không hợp lệ, báo là Dữ liệu không hợp lệ.
// Nếu mảng đối xứng, trả về true, ngược lại trả về false.
// Input:
const arrayNumber = [1, 2, 3, 4, 3, 2, 1];
function checkSymmetricalArr(arr) {
  //Buoc 1: kiểm tra có phải là mảng
  if (!Array.isArray(arr)) {
    console.error(error);
    return "Loi roi";
  }
  //buoc 2: kiem tra mang neu co 1 phan tu thi false, neu hop le thi ktra xem co doi xung hay khong
  if (arr.length === 1) {
    console.error("Khong kiem tra duoc vi mang chi co 1 phan tu".error);
    return "Khong kiem tra duoc vi mang chi co 1 phan tu";
  }
  //buoc 3: so sanh xem co doi xung khong
  for (let i = 0; i < arr.length / 2; i++) {
    //so sanh phan tu i voi cac phan tu doi xung ben kia
    if (arr[i] !== arr[arr.length - 1 - i]) {
      //khong doi xung => false
      return false;
    }
  }
  return true;
}

// Output:
const result = checkSymmetricalArr(arrayNumber);
console.log(result); //true
