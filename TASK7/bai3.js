// Bạn có danh sách các học viên, mỗi học viên có name và scores là một mảng điểm.
// Hãy viết hàm để tạo ra một mảng mới, mỗi phần tử là object gồm:
// name: tên học viên
// average: điểm trung bình làm tròn đến 1 chữ số thập phân

// Input
const students = [
  { name: "An", scores: [8, 7.5, 9] },
  { name: "Bình", scores: [6, 5.5, 7] },
  { name: "Chi", scores: [9, 9.5, 10] },
];
// Output mong muốn
// [
//   { name: "An", average: 8.2 },
//   { name: "Bình", average: 6.2 },
//   { name: "Chi", average: 9.5 },
// ]
// Yêu cầu: Sử dụng map() để tạo mảng mới.

// Tính trung bình từ mảng scores (dùng for hoặc forEach, chưa dùng reduce).

// Làm tròn đến 1 chữ số thập phân (gợi ý: Math.round(x * 10) / 10)

const newFunction = (students) => {
  return students.map((student) => {
    let sum = 0;

    //dung vong lap for de duyet tung phan de tinh tong
    for (let i = 0; i < student.scores.length; i++) {
      sum += student.scores[i];
    }

    //tinh trun binh
    let average = sum / student.scores.length;

    //lam tron 1 chu so thap phan
    average = Math.round(average * 10) / 10;

    //tra ve bang diem moi
    return {
      name: student.name,
      average: average,
    };
  });
};
const row = newFunction(students);
console.log(row);
