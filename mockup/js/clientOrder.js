var confirmButton = document.getElementById("confirm");
var items = document.querySelectorAll(".order-item");
var selected;

confirmButton.addEventListener("click", confirmOrder);

for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
  items[i].addEventListener("click", () => {
    selectItem(items[i]);
  });
}

function confirmOrder() {
  alert("Your order of " + selected.id + " will be ready in 12 minutes.");
}

function selectItem(myItem) {
  console.log("Click");
  selected = myItem;
  for (let i = 0; i < items.length; i++) {
    if (items[i] !== myItem) {
      items[i].style.backgroundColor = "white";
    }

    myItem.style.backgroundColor = "green";
  }
}
