// Viết hàm convertNested(arr) để chuyển một mảng 1 chiều bất kỳ thành dạng lồng (nested).

// const { Children } = require("react");

const categories = [
  { id: 1, name: "Chuyên mục 1", parent: 0 },
  { id: 2, name: "Chuyên mục 2", parent: 0 },
  { id: 3, name: "Chuyên mục 3", parent: 0 },
  { id: 4, name: "Chuyên mục 2.1", parent: 2 },
  { id: 5, name: "Chuyên mục 2.2", parent: 2 },
  { id: 6, name: "Chuyên mục 2.3", parent: 2 },
  { id: 7, name: "Chuyên mục 3.1", parent: 3 },
  { id: 8, name: "Chuyên mục 3.2", parent: 3 },
  { id: 9, name: "Chuyên mục 3.3", parent: 3 },
  { id: 10, name: "Chuyên mục 2.2.1", parent: 5 },
  { id: 11, name: "Chuyên mục 2.2.2", parent: 5 },
];

function convertNested(arr) {
  const map = {};
  const row = [];
  for (const item of arr) {
    const { parent, ...rest } = item;
    map[item.id] = { ...rest, Children: [] };
  }

  for (const item of arr) {
    const resul1 = map[item.id];
    if (item.parent === 0) {
      row.push(resul1);
    } else {
      const parent = map[item.parent];
      if (parent) {
        parent.Children.push(resul1);
      }
    }
  }
  return row;
}
// Kết quả:

const categoriesNess = convertNested(categories);

console.log(categoriesNess);
