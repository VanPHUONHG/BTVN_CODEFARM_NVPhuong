// Input:
const arrayWords = ["Hello world", "JS is fun", "Arrays and strings"];
function countTotalWords(arr) {
  let row = 0;
  for (let i = 0; i < arr.length; i++) {
    const result = arr[i];
    const more = result.split(" ");
    row += more.length;
  }
  return row;
}

// Output:
console.log(
  countTotalWords(["Hello world", "JS is fun", "Arrays and strings"])
); // 8
