// // Input:
// function calcBMI(weight, height) {
//   // logic
//   if (Number.isNaN(weight) || Number.isNaN(height)) {
//     console.log("chieu cao hoac can nang khong dung kieu du lieu");
//   }

//   if (weight <= 0 || height <= 0) {
//     console.log("chieu cao hoac can nang khong the no hon hoac bang 0");
//   }

//   let BMI = weight / height ** 2;
//   BMI = Number(BMI.toFixed(2)); // Làm tròn 2 chữ số
//   //   if (BMI < 18.5) {
//   //     console.log(`BMI = ${BMI}, Thiếu cân`);
//   //   } else if (18.5 <= BMI && BMI < 23) {
//   //     console.log(`BMI = ${BMI}, Bình thường`);
//   //   } else if (BMI >= 25) {
//   //     console.log(`BMI = ${BMI}, Béo phì`);
//   //   } else {
//   //     console.log(`BMI = ${BMI}, Thừa cân`);
//   //   }

//   //   switch (true) {
//   //     case BMI < 18.5:
//   //       console.log(`BMI = ${BMI}, Thiếu cân`);
//   //       break;
//   //     case BMI >= 18.5 && BMI < 23:
//   //       console.log(`BMI = ${BMI}, Bình thường`);
//   //       break;
//   //     case BMI >= 23 && BMI < 25:
//   //       console.log(`BMI = ${BMI},Béo phì `);
//   //       break;
//   //     default:
//   //       console.log(`BMI = ${BMI}, Thừa cân `);
//   //   }
// }

// const h = Number(prompt("Moi nhap vao chieu cao (met)"));
// const w = Number(prompt("Moi nhap vao can nang (kg)"));

// // Output:
// // calcBMI(); // "BMI = 20.76, Bình thường"

// calcBMI(w, h);

/**
 * * Dùng if else khi:
 * - có ít hơn hoặc tối đa 3 trường hợp (case)
 * - Khi không có gia trị cụ thể( có thể là khoảng giá trị )
 *
 * * Dùng switch case khi:
 * - KHi có nhiều trường hợp xảy ra (case)
 * - Khi có các giá trị cụ thể cho case
 */
// const myDate = new Date().getDay();
// console.log(new Date("2025-7-14").getDay());

// function getDayOfWeek(Date) {
//   switch (Date) {
//     case 0:
//       console.log("thu 2");
//       break;
//     case 1:
//       console.log("thu 3");
//       break;
//     case 2:
//       console.log("thu 4");
//       break;
//     case 3:
//       console.log("thu 5");
//       break;
//     case 4:
//       console.log("thu 6");
//       break;
//     case 5:
//       console.log("thu 7");
//       break;
//     default:
//       console.log("gia tri khong hop le");
//   }
// }
// getDayOfWeek(myDate);

function getDay(strinDay) {
  let day = new Date(strinDay).getDay();
  console.log(day);

  switch (day) {
    case 0:
      console.log("chu nhat");
      break;
    case 1:
      console.log("thu hai");
      break;
    case 2:
      console.log("thu ba");
      break;
    case 3:
      console.log("thu tu");
      break;
    case 4:
      console.log("thu lam");
      break;
    case 5:
      console.log("thu sau");
      break;
    case 6:
      console.log("thu 7");
      break;
  }
}
const input = prompt();
getDay(input);
