function render() {
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        let groups = document.getElementById('groups');
        for (let j = 1; j < dish.length; j++) {
            const food = dish[j];
            addHeadSection(groups, food, dish, i, j);
            groups.innerHTML += HTMLTemplate(food, i, j);
        }
    }
}

function HTMLTemplate(food, i, j) {
    return /*html*/ `
        <div class="add" id="${food['meal']}" onclick="alreadyAdded(${i}, ${j})">
            <div class="block">
                <div class="space">
                    <h4><b>${food['meal']}</b></h4>
                    <p class="description">${food['description']}</p>
                    <p class="choice" id="choice${food['meal']}">${food['choice']}</p>
                </div>
                <h4><b>${food['price'].toFixed(2).replace('.', ',')} €</b></h4>
            </div>
            <img class="roundBorder iconDishes" src="img/png/plus.png" alt="">    
        </div>
    `;
}

function addHeadSection(groups, food, dish, i, j) {
    if (j == 1) {
        j--;
        food = dish[j];
        groups.innerHTML += headSectionHTML(food, i);
        controlImage(food, i);
    }
}

function headSectionHTML(food) {
    return /*html*/ `
        <img class="image noHeight" id="${food['title']}" src="${food['image']}" alt="">
        <h3><b>${food['title']}</b></h3>
    `;
}

function controlImage(food) {
    if (food['image'] != '') {
        document.getElementById(`${food['title']}`).classList.remove('noHeight');
    }
}

function slide() {
    let left = document.getElementById('left');
    let right = document.getElementById('right');
    let slide = document.getElementById('slide');

    left.classList.toggle('d-none');
    right.classList.toggle('d-none');
    slide.classList.toggle('slide');
}