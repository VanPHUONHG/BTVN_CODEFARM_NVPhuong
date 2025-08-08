// Viết một hàm để sắp xếp danh sách người dùng theo tên
// Hàm sortUsersByName(users):

// Nhận vào một mảng các object người dùng, mỗi object có thuộc tính fullName.
// Trả về mảng đã được sắp xếp theo thứ tự bảng chữ cái từ a-z của tên.
// Nếu tên của hai người giống nhau, tiếp tục so sánh theo họ và tên đệm (Biết rằng người Việt có tên là 1 từ đơn đứng ở cuối cùng, còn lại toàn bộ các từ trong tên đầy đủ của người Việt được coi là họ và tên đệm).
// Ví dụ:

// Nguyễn Minh Hoàng -> "Hoàng" là tên, "Nguyễn Minh" là họ và tên đệm.
// Nguyễn Thị Thuỳ Linh -> "Linh" là tên, "Nguyễn Thị Thuỳ" là họ và tên đệm.
const users = [
  { fullName: "Nguyễn Minh Hoàng" },
  { fullName: "Nguyễn Đức Hoàng" },
  { fullName: "Lê Văn" },
  { fullName: "Lê Văn Tình" },
  { fullName: "Lê Nin" },
];
function sortUsersByName(users) {
  return users.sort((acc, cur) => {
    const ten1 = acc.fullName.split(" ");
    const ten2 = cur.fullName.split(" ");

    const lastName1 = ten1[ten1.length - 1];
    const lastName2 = ten2[ten2.length - 1];

    if (lastName1 > lastName2) {
      return 1;
    }
    if (lastName1 < lastName2) {
      return -1;
    }

    const resul1 = ten1.slice(0, -1).join("");
    const resul2 = ten2.slice(0, -1).join("");

    if (resul1 < resul2) {
      return -1;
    }
    if (resul1 > resul2) {
      return 1;
    }
    return 0;
  });
}

const row = sortUsersByName(users);
console.log(row);
