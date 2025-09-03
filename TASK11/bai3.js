document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("textInput");
  const wordDisplay = document.getElementById("wordCount");
  const charDisplay = document.getElementById("charCount");

  inputBox.addEventListener("input", () => {
    let text = inputBox.value.trim();
    let words = text === "" ? 0 : text.split(/\s+/).length;
    wordDisplay.textContent = "Số từ: " + words;

    let charLeft = 200 - text.length;
    charDisplay.textContent = "Số ký tự còn lại: " + charLeft;

    if (charLeft <= 20) {
      charDisplay.classList.add("warning");
    } else {
      charDisplay.classList.remove("warning");
    }
  });
});
