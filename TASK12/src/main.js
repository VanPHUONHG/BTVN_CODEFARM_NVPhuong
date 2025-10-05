const url = "http://localhost:3000/products";

const productsList = document.getElementById("dataProducts");
const formProducts = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
let isUpdateMode = false;
let currentProductId = null;

fetch(url)
  .then((res) => {
    console.log(res);
    console.log(typeof res);
    return res.json();
  })
  .then((data) => {
    let content = "";
    data.forEach((item) => {
      content += `
      <tr>  
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
          <button class="update-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Update</button>
        </td>
      </tr>`;
    });
    productsList.innerHTML = content;

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        if (
          confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${productId} này không?`)
        ) {
          fetch(`${url}/${productId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Delete successful:", data);
              window.location.reload();
            })
            .catch((error) => console.error("Error deleting product:", error));
        }
      });
    });

    document.querySelectorAll(".update-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        const productName = this.getAttribute("data-name");
        const productPrice = this.getAttribute("data-price");

        nameInput.value = productName;
        priceInput.value = productPrice;
        isUpdateMode = true;
        currentProductId = productId;

        formProducts.querySelector('button[type="submit"]').textContent =
          "Cập nhật sản phẩm";
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

formProducts.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formProducts);
  const data = Object.fromEntries(formData);
  console.log(data);

  if (!data.name || data.name.trim().length === 0) {
    alert("Tên sản phẩm không được để trống!");
    return;
  }
  if (data.name.trim().length < 3) {
    alert("Tên sản phẩm phải có ít nhất 3 ký tự!");
    return;
  }

  const price = parseFloat(data.price);
  if (isNaN(price) || price <= 0) {
    alert("Giá sản phẩm phải lớn hơn 0!");
    return;
  }
  if (price < 1) {
    alert("Giá sản phẩm phải lớn hơn hoặc bằng 1!");
    return;
  }

  const method = isUpdateMode ? "PUT" : "POST";
  const endpoint = isUpdateMode ? `${url}/${currentProductId}` : url;

  fetch(endpoint, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(
        isUpdateMode ? "Update successful:" : "Add successful:",
        data
      );
      formProducts.reset();
      formProducts.querySelector('button[type="submit"]').textContent =
        "Thêm sản phẩm";
      isUpdateMode = false;
      currentProductId = null;
      window.location.reload();
    })
    .catch((error) => console.log(error));
});
