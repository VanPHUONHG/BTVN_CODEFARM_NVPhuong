// Tính tổng giá tiền của các đơn hàng đã hoàn thành
// Thực hiện viết hàm calculateTotalCompletedAmount() để tính tổng tiền của các order có amount lớn hơn giá trị nhập vào và status = completed.
// Nếu không tìm được phần tử nào thì in ra 0.
//Input:
const orders = [
  { id: 1, amount: 100, date: "2025-04-01", status: "completed" },
  { id: 2, amount: 200, date: "2025-04-02", status: "pending" },
  { id: 3, amount: 150, date: "2025-04-03", status: "completed" },
  { id: 4, amount: 300, date: "2025-04-04", status: "shipped" },
  { id: 5, amount: 50, date: "2025-04-05", status: "cancelled" },
  { id: 6, amount: 120, date: "2025-04-06", status: "completed" },
  { id: 7, amount: 180, date: "2025-04-07", status: "shipped" },
  { id: 8, amount: 220, date: "2025-04-08", status: "pending" },
  { id: 9, amount: 350, date: "2025-04-09", status: "completed" },
  { id: 10, amount: 500, date: "2025-04-10", status: "completed" },
];
function calculateTotalCompletedAmount(array, amount) {
  const row = array.filter(
    (item) => item.status === "completed" && item.amount > amount
  );
  const result = row.reduce((item, index) => item + index.amount, 0);
  return result;
}

// Output:
const result = calculateTotalCompletedAmount(orders, 150);
console.log("kết quả trả về là:", result); // 850

const result2 = calculateTotalCompletedAmount(orders, 1000);
console.log("Kết quả trả về là:", result2); // 0
