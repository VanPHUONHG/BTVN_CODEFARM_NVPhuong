// Thực hiện viết hàm filteredProductNames() để lọc ra các sản phẩm có giá lớn hơn giá nhập vào và trả về các sản phẩm đó.

// Nếu không tìm đươc trả về mảng rỗng.

// Input:
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 50 },
  { id: 3, name: "Keyboard", price: 150 },
  { id: 4, name: "Monitor", price: 300 },
  { id: 5, name: "USB Cable", price: 25 },
  { id: 6, name: "Webcam", price: 120 },
  { id: 7, name: "Desk Lamp", price: 80 },
  { id: 8, name: "Headphones", price: 200 },
  { id: 9, name: "Speaker", price: 180 },
  { id: 10, name: "Chair", price: 250 },
];

function filteredProductNames(array, price) {
  // tạo 1 mảng rỗng để lưu kết quả
  const row = [];
  // - dùng 1 vòng lặp để duyệt mảng

  for (let i = 0; i < array.length; i++) {
    const product = array[i];
    // - nếu thuộc tính price của phẩn tử đó bằng với price truyền vào thì lưu phần thử đó vào trong mảng rỗng đã tạo

    if (product.price > price) {
      row.push(product.name);
    }
  }
  return row;
}
// Output:
const result = filteredProductNames(products, 200);
console.log(result); // [ 'Laptop', 'Monitor', ''Headphones, 'Chair' ]
