import React from "react";
import students from "./data";

const Products = () => {
  const tatleScore = (score) => {
    if (score < 3) {
      return { title: "yếu", color: "red" };
    } else if (score < 6) {
      return { title: "tb", color: "orange" };
    } else if (score <= 8) {
      return { title: "khá", color: "blue" };
    } else if (score < 9.5) {
      return { title: "giỏi", color: "green" };
    } else if (score <= 10) {
      return { title: "xuất xắc ", color: "purple" };
    } else {
      return { color: "black" };
    }
  };

  const scoreMax = Math.max(...students.map((item) => item.score));
  const studentMax = students.find((item) => item.score === scoreMax);
  return (
    <div>
      <h2>DANH SÁCH SINH VIÊN</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">fullName</th>
            <th scope="col">gender</th>
            <th scope="col">age</th>
            <th scope="col">major</th>
            <th scope="col">score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => {
            return (
              <tr key={item.id}>
                <th>{item.fullName}</th>
                <th>{item.gender}</th>
                <th>{item.age}</th>
                <th>{item.major}</th>
                <th style={{ color: tatleScore(item.score).color }}>
                  {item.score}: {tatleScore(item.score).title}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {studentMax && (
        <h3 style={{ color: tatleScore(studentMax.score).color }}>
          Sv có điểm cao nhất: {studentMax.fullName} - {studentMax.score} điểm (
          {tatleScore(studentMax.score).title})
        </h3>
      )}
    </div>
  );
};

export default Products;
