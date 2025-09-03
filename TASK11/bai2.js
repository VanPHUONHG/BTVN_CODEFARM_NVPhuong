const students = [
  { id: 1, name: "Nguyễn Văn A", age: 20, city: "Hà Nội" },
  { id: 2, name: "Trần Thị B", age: 19, city: "TP.HCM" },
  { id: 3, name: "Lê Văn C", age: 21, city: "Đà Nẵng" },
];

function studentsTable() {
  const table = document.getElementById("dataTable");

  let tableHTML = ` <tr>
     <td>STT</td>
     <td>TEN</td>
     <td>TUOI</td>
     <td>THANH PHO</td>
  </tr>`;

  students.forEach((item) => {
    tableHTML += ` <tr>
     <td>${item.id}</td>
     <td>${item.name}</td>
     <td>${item.age}</td>
     <td>${item.city}</td>
  </tr>`;
  });

  table.innerHTML = tableHTML;

  table.style.border = "1px solid black";
  table.style.width = "80%";
  table.style.margin = "20px auto";

  const taoVien = table.querySelectorAll("th", "td");
  taoVien.forEach((arr) => {
    taoVien.style.border = "1px solid black";
  });
}

document.addEventListener("DOMContentLoaded", studentsTable);
