// Input:
const categories = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Laptops",
        children: [
          {
            id: 3,
            name: "Apple",
          },
          {
            id: 4,
            name: "Dell",
          },
        ],
      },
      {
        id: 5,
        name: "Headphones",
      },
    ],
  },
  {
    id: 6,
    name: "Books",
    children: [
      {
        id: 7,
        name: "Fiction",
        children: [
          {
            id: 8,
            name: "Thrillers",
          },
          {
            id: 9,
            name: "Mystery",
          },
        ],
      },
      {
        id: 10,
        name: "Non-Fiction",
      },
    ],
  },
];
// Yêu cầu:

// Hãy viết hàm flattenCategories(arr) để làm phẳng mảng categories bất kỳ.
// Mảng đã làm phẳng là mảng 1 chiều với mỗi phần tử trong mảng mới sẽ chứa thông tin của một danh mục với thêm trường parentId để tham chiếu đến danh mục cha của danh mục đó.
// Nếu parentId của danh mục cha không có thì gán bằng 0.

function flattenCategories(arr, paramId = 0) {
  let row = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    const newItems = {
      paramId: paramId,
      id: item.id,
      name: item.name,
    };

    row.push(newItems);
    if (item.children && Array.isArray(item.children)) {
      const flo = flattenCategories(item.children, item.id);
      row = row.concat(flo);
    }
  }
  return row;
}
const result = flattenCategories(categories);
console.log(result);
