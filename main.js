import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopalert-99a3a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopalertInDB = ref(database, "shoplist")

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shopListEl = document.getElementById("shop-list");

let itemsArray = [];

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shopalertInDB, inputValue)

    clearInputFieldEl()

})
onValue(shopalertInDB, function(snapshot) {
    const data = snapshot.val();
    if (data) {
        itemsArray = Object.entries(data); // Update the local array
    } else {
        itemsArray = []; // If there's no data, reset the local array
    }

    clearShopListEl();
    renderShopList(); // Update the DOM
});


function clearShopListEl() {
    shopListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function renderShopList() {
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShopListEl(currentItem);
    }
}

function appendItemToShopListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.addEventListener("click", function() {
        let specifiedItemLocationInDB = ref(database, `shoplist/${itemID}`)

        remove(specifiedItemLocationInDB)
    })

    newEl.textContent = itemValue

    shopListEl.append(newEl)
}