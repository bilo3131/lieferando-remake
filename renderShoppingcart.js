function renderOrder() {
    let order = myShoppingcart[0]['meal'];
    let shoppingcart = document.getElementById('shoppingcart');
    shoppingcart.innerHTML = '<h3>Warenkorb</h3>';
    for (let i = 0; i < order.length; i++) {
        const element = order[i];
    }
    controlShoppingcart(shoppingcart, order);
}

function controlShoppingcart(shoppingcart, order) {

    if (order.length == 0) {
        shoppingcart.innerHTML += voidShoppingcartHTML();
    } 
    // else {
    //     shoppingcart.innerHTML += filledSoppingcartHTML(element);
    // }
}

function voidShoppingcartHTML() {
    return /*html*/ `
        <img src="img/png/shoppingBag.png" alt="">
        <h3>Fülle deinen Warenkorb</h3>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    `;
}

function filledSoppingcartHTML(lastAdd) {
    return /*html*/ `
        <div class="orderSection">
            <span class="order">
                <p class="orderMeal"><b>${myShoppingcart[0]['ammount'][lastAdd]}</b></p>
                <span>
                    <p class="orderMeal"><b>${myShoppingcart[0]['meal'][lastAdd]}</b></p>
                    <p class="orderPrice">${(myShoppingcart[0]['price'][lastAdd] * myShoppingcart[0]['ammount'][lastAdd]).toFixed(2)} €</p>
                </span>
            </span>
            <div class="addSubstract">
                <img onclick="addAnother(${lastAdd})" class="roundBorder iconDishes" src="img/png/minus.png" alt="">
                <img onclick="deleteOne(${lastAdd})" class="roundBorder iconDishes" src="img/png/plus.png" alt="">
            </div>
        </div>
    `;
}

function alreadyAdded(i, j) {
    let savedMeals = myShoppingcart[0]['meal'];
    let clickedMeal = dishes[i][j]['meal'];
    let clickedPrice = dishes[i][j]['price'];
    let lastAdd = myShoppingcart[0]['meal'].length - 1;
    let notAdded = myShoppingcart[0]['meal'].length;
    // Die Schleife kontrolliert, ob das "meal" schon bestellt wurde.
    for (let added = 0; added < savedMeals.length; added++) {
        if (clickedMeal == savedMeals[added]) {
            addedMeal(added, lastAdd);
        }
        else if (added == lastAdd) {
            addMeal(clickedMeal, clickedPrice, notAdded);
        }
    }
    addMeal(clickedMeal, clickedPrice, notAdded);
}

// function addedMeal(added, lastAdd) {
//     myShoppingcart[0]['ammount'][added] += 1;
//     controlShoppingcart(lastAdd);
// }

// function addMeal(clickedMeal, clickedPrice, lastAdd) {
//     // in das Array werden die Werte gepusht.
//     myShoppingcart[0]['ammount'].push(1); //[1, 1, 1]
//     myShoppingcart[0]['meal'].push(clickedMeal); //['Döner', 'Dönrteller', 'Pizza']
//     myShoppingcart[0]['price'].push(clickedPrice); //[6.5, 11, 10]

//     controlShoppingcart(lastAdd);
// }