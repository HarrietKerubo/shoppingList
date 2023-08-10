import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shoppinglist-84393-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");
const addButtonEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let item = inputFieldEl.value;
  push(itemsInDB, item);
  clearInputFieldEl();
});

onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      renderShoppingList(currentItem);
    }
  } else {
    shoppingListEl.textContent = "No items here ... yet";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function renderShoppingList(itemValue) {
  // shoppingListEl.innerHTML += `<li> ${itemValue} </li>`;
  let currentItemID = itemValue[0];
  let currentItemValue = itemValue[1];
  let newEl = document.createElement("li");

  newEl.textContent = currentItemValue;

  shoppingListEl.append(newEl);

  newEl.addEventListener("dblclick", function () {
    let exactLocationofItemInDB = ref(database, `items/${currentItemID}`);
    remove(exactLocationofItemInDB);
  });
}
