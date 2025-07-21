function findMinMaxAverage(arr) {
  // buoc 1 gan min va max
  let max = arr[0];
  let maxIndext = 0;
  let min = arr[0];
  let minIndext = 0;

  // duyet mang de tim max va min
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndext = i;
    }
    if (arr[i] < min) {
      min = arr[i];
      minIndext = i;
    }
  }

  //   bươc 3: viết hàm kiểm tra số nguyên tố
  function soNguyenTo(n) {
    if (n < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
  // Bước 3: Tính trung bình cộng các số nguyên tố
  let sum = 0;
  let win = 0;
  for (let i = 0; i < arr.length; i++) {
    if (soNguyenTo(arr[i])) {
      // cong vao tong
      sum += arr[i];
      //   tang dem
      win++;
    }
  }

  // Nếu có ít nhất 1 số nguyên tố => tính trung bình
  let tinhTrungBinh = null;
  if (win > 0) {
    tinhTrungBinh = +(sum / win).toFixed(2);
  }

  return {
    max: max,
    maxIndex: maxIndext,
    min: min,
    minIndex: minIndext,
    tinhTrungBinh: tinhTrungBinh,
  };
}

// Output:
console.log(findMinMaxAverage([3, 1, 4, 1, 5, 9, 2, 6]));
// Output: {max: 9, maxIndex: 5, min: 1, minIndex: 1, primeAverage: 3.33 }
console.log(findMinMaxAverage([5, 5, 2, 2, 1]));
// Output: {max: 5, maxIndex: 0, min: 1, minIndex: 4, primeAverage: 3.5 }
console.log(findMinMaxAverage([-3, 7, -8, 11, 0]));
// Output: {max: 11, maxIndex: 3, min: -8, minIndex: 2, primeAverage: 9 }
