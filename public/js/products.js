// delete product
let trashcan = document.getElementsByClassName("delete");
for (let i = 0; i < trashcan.length; i++) {
  trashcan[i].addEventListener("click", (e) => {
    const endpoint = `/products/${trashcan[i].dataset.doc}`;
    fetch(endpoint, {
      method: "DELETE",
    }).then(() => (window.location.href = "/products"));
  });
}
// update product
let name = document.getElementById("name");
let price = document.getElementById("price");
let category = document.getElementById("category");
let description = document.getElementById("description");
let editIcon = document.getElementsByClassName("update");
let productId = "";
const closeIcon = document.getElementsByClassName("fa-window-close")[0];
closeIcon.addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
});
for (let i = 0; i < editIcon.length; i++) {
  editIcon[i].addEventListener("click", (e) => {
    document.getElementById("overlay").style.display = "block";
    productId = editIcon[i].dataset.doc;
    fetch(`/products/product/${productId}`).then((res) => {
      res.json().then((productData) => {
        name.value = productData[0].name;
        price.value = productData[0].price;
        category.value = productData[0].category;
        description.value = productData[0].description;
      });
    });
  });
}
// update btn
let updateBtn = document.getElementById("btn");
updateBtn.addEventListener("click", editProduct);
function editProduct() {
  document.getElementById("overlay").style.display = "none";
  fetch(`/products/product/${productId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      category: category.value,
      description: description.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => (window.location.href = "/products"));
}
