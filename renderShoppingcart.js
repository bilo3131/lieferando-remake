function renderOrder() {
    let order = myShoppingcart[0]['amount'];
    let shoppingcart = document.getElementById('shoppingcart');
    let subtotal = 0;
    shoppingcart.innerHTML = '<h3>Warenkorb</h3>';
    for (let i = 0; i < order.length; i++) {
        let amount = order[i];
        let price = myShoppingcart[0]['price'][i];
        subtotal += price*amount;
        calculateOrderValue(subtotal);
        shoppingcart.innerHTML += filledSoppingcartHTML(i);
    }
    controlShoppingcart(order, shoppingcart);
}

function controlShoppingcart(order, shoppingcart) {
    if (order.length == 0) {
        document.getElementById('costs').classList.add('d-none');
        shoppingcart.innerHTML += voidShoppingcartHTML();
    }
}

function voidShoppingcartHTML() {
    return /*html*/ `
        <img src="img/png/shoppingBag.png" alt="">
        <h3>Fülle deinen Warenkorb</h3>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    `;
}

function filledSoppingcartHTML(i) {
    return /*html*/ `
        <div class="orderSection">
            <span class="order">
                <p class="orderMeal"><b>${myShoppingcart[0]['amount'][i]}</b></p>
                <span>
                    <p class="orderMeal"><b>${myShoppingcart[0]['meal'][i]}</b></p>
                    <p class="orderPrice">${(myShoppingcart[0]['price'][i] * myShoppingcart[0]['amount'][i]).toFixed(2)} €</p>
                </span>
            </span>
            <div class="addSubstract">
                <img onclick="deleteOne(${i})" class="roundBorder iconDishes" src="img/png/minus.png" alt="">
                <img onclick="addAnother(${i})" class="roundBorder iconDishes" src="img/png/plus.png" alt="">
            </div>
        </div>
    `;
}

function alreadyAdded(i, j) {
    let clickedMeal = dishes[i][j]['meal'];
    let clickedPrice = dishes[i][j]['price'];
    let orderMeal = myShoppingcart[0]['meal'];
    let ordersAmount = myShoppingcart[0]['amount'];
    if (orderMeal.length > 0) {
        checkOrder(orderMeal, clickedMeal, clickedPrice, ordersAmount);
    }
    else {
        addMeal(clickedMeal, clickedPrice)
    }
}

function addMeal(clickedMeal, clickedPrice) {
    myShoppingcart[0]['amount'].push(1);
    myShoppingcart[0]['meal'].push(clickedMeal);
    myShoppingcart[0]['price'].push(clickedPrice);
    console.log(myShoppingcart[0]);
    renderOrder();
}

function checkOrder(orderMeal, clickedMeal, clickedPrice, ordersAmount) {
    let position = orderMeal.indexOf(clickedMeal);
    if (position == -1) {
        addMeal(clickedMeal, clickedPrice);
    } else {
        ordersAmount[position]++;
        renderOrder();
    }
}

function calculatePrice(subtotal, difference) {
    delivery = 1.5;
    let sum = subtotal + delivery;
    let costs = document.getElementById('costs');
    costs.classList.remove('d-none');
    costs.innerHTML = calculateHTML(subtotal.toFixed(2), delivery.toFixed(2), sum.toFixed(2), difference.toFixed(2));
    if (subtotal >= 10) {
        document.getElementById('orderValue').classList.add('d-none');        
    } else {
        document.getElementById('buy').classList.remove('buy');
        document.getElementById('buy').classList.add('clickRemove');
    }
}

function calculateOrderValue(subtotal){
    let difference = 10-subtotal;
    calculatePrice(subtotal, difference);
}

function calculateHTML(subtotal, delivery, sum, difference) {
    return /*html*/ `
        <p class="orderValue" id="orderValue">Noch ${difference} € bis zum Mindestbestellwert</p>
        <span>
            <p>Zwischensumme</p>
            <p>${subtotal} €</p>
        </span>
        <span>
            <p>Leferkosten</p>
            <p>${delivery} €</p>
        </span>
        <span>
            <p><b>Gesamt</b></p>
            <p><b>${sum} €</b></p>
        </span>
        <button class="buy" id="buy">BESTELLEN</button>
    `;
}

function addAnother(i) {
    myShoppingcart[0]['amount'][i]++;
    renderOrder();
}

function deleteOne(i) {
    myShoppingcart[0]['amount'][i]--;
    if (myShoppingcart[0]['amount'][i] == 0) {
        deleteMeal(i);
    }
    renderOrder();
}

function deleteMeal(i) {
    myShoppingcart[0]['amount'].splice(i, 1);
    myShoppingcart[0]['price'].splice(i, 1);
    myShoppingcart[0]['meal'].splice(i, 1);
}