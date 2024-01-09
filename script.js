const Food = [
    {
        id: 1,
        name: 'Burger',
        price: 5,
        description: 'Delicious cheeseburger',
    },
    {
        id: 2,
        name: 'Pizza',
        price: 10,
        description: 'Cheesy pizza',
    },
    {
        id: 3,
        name: 'Hot Dog',
        price: 3,
        description: 'Long, big and juicy hot dog',
    }
];

const Drinks = [
    {
        id: 1,
        name: 'Coca Cola',
        price: 2,
        description: 'Icy coca cola',
    },
    {
        id: 2,
        name: 'Sprite',
        price: 2,
        description: 'Icy sprite',
    },
    {
        id: 3,
        name: 'Fanta',
        price: 2,
        description: 'Icy fanta',
    }
];

const Sides = [
    {
        id: 1,
        name: 'Fries',
        price: 2,
        description: 'Salt n\' Crispy fries',
    },
    {
        id: 2,
        name: 'Onion Rings',
        price: 2,
        description: 'Tasty onion rings',
    },
    {
        id: 3,
        name: 'Chili Cheese Tops',
        price: 2,
        description: 'Hot&Spicy...',
    }
];

const Desserts = [
    {
        id: 1,
        name: 'McFlurry',
        price: 2,
        description: 'Yummy McFlurry',
    },
    {
        id: 2,
        name: 'Cake',
        price: 2,
        description: 'Melty chocolate right from the oven',
    },
    {
        id: 3,
        name: 'Pie',
        price: 2,
        description: 'Fresh apple pie',
    }
];

const Menues = [
    {
        menu: GetRandomMenu()
    },
    {
        menu: GetRandomMenu()
    },
    {
        menu: GetRandomMenu()
    }
];

// Random menues generated
function GetRandomMenu() {
    return [GetRandomIndex(Food.length), GetRandomIndex(Drinks.length), GetRandomIndex(Sides.length), GetRandomIndex(Desserts.length)];
}

function GetRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

let currentOrder = [];
let totalSum = 0;
let currentIndex = 1;

function DisplayMenu(menu) {
    let menuContainer = document.getElementById('menu-container');
    let menuType = document.createElement('h3');
    menuType.className = 'menu-type';
    menuType.innerHTML = GetMenuType(menu);
    menuContainer.appendChild(menuType);
    menu.forEach((item) => {
        let menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-price">${item.price}$</div>
        <div class="menu-item-description">${item.description}</div>
        <div class="menu-item-buttons">
            <button class="btn btn-outline-success menu-item-add">Add</button>
            <button class="btn btn-outline-danger menu-item-remove">Remove</button>
        </div>
        `;
        
        menuItem.querySelector(`.menu-item-add`).addEventListener('click', () => {
            currentOrder.push(item);
            displayorder(currentOrder);
        });

        menuItem.querySelector(`.menu-item-remove`).addEventListener('click', () => {
            // Honestly hvad fuck er javascript
            currentOrder = [...currentOrder.filter((orderItem) => {
                return orderItem.id != item.id || orderItem.name != item.name || orderItem.price != item.price;
            }), ...currentOrder.filter((orderItem) => {
                return orderItem.id == item.id && orderItem.name == item.name && orderItem.price == item.price;
            }).slice(1)]
            displayorder(currentOrder);
        });
        menuContainer.appendChild(menuItem);
    });
}

function displayorder(order) {
    let orderContainer = document.getElementById('order-container');
    orderContainer.innerHTML = '';
    let orderItems = [];
    order.forEach((item) => {
        let orderItem = orderItems.find((orderItem) => {
            return orderItem.id == item.id && orderItem.name == item.name && orderItem.price == item.price;
        });
        if (orderItem) {
            orderItem.count++;
        }
        else {
            orderItems.push({id: item.id, name: item.name, price: item.price, count: 1});
        }
    });

    orderItems.forEach((item) => {
        let orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
        <div class="order-item-name">${item.name} x${item.count}</div>
        <div class="order-item-price">${item.price * item.count}$</div>`;
        orderContainer.appendChild(orderItem);
    });

    if (order.length > 0)
    {
        let orderInfo = document.createElement('div');
        orderInfo.className = 'order-info';
        orderInfo.innerHTML = `
        <button class="btn btn-outline-success order-button">Checkout</button>
        `;
        orderContainer.appendChild(orderInfo);

        orderInfo.querySelector(`.order-button`).addEventListener('click', () => {
            console.log(typeof displayModal);
            displayModal(order);
            /* Den første måde jeg gjorde det på
            let orderNumber = document.getElementById('order-number');
            currentIndex++;
            totalSum += totalPrice(order);
            displayTotalEarnings();
            orderNumber.innerHTML = `Order #${currentIndex}`;
            order = [];
            currentOrder = [];
            orderContainer.innerHTML = '';
            orderContainer.appendChild(orderInfo);
            displayorder(currentOrder);
            */
        });
    }
}

// Create a modal that displays the order with the total price and two buttons: Confirm and Cancel
function displayModal(order) {
    const modal = document.getElementById('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    let orderItems = [];
    order.forEach((item) => {
        // orderItem er en bool, som er baseret på om der er et item i orderItems, som har samme id, navn og pris som det item, som vi er ved at tjekke
        let orderItem = orderItems.find((orderItem) => {
            return orderItem.id == item.id && orderItem.name == item.name && orderItem.price == item.price;
        });
        // Hvis der er et item i orderItems, som har samme id, navn og pris som det item, som vi er ved at tjekke, så skal vi bare øge count med 1
        if (orderItem) {
            orderItem.count++;
        }
        else {
            // Tilføj nyt item til vores array
            orderItems.push({id: item.id, name: item.name, price: item.price, count: 1});
        }
    });

    modalContent.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title">Order #${currentIndex}</h5>
            <button type="button" class="btn-close modal-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="modal-order">
                ${orderItems.map(item => `
                    <div class="modal-order-item">
                        <div class="modal-order-item-name">${item.name} x${item.count}</div>
                        <div class="modal-order-item-price">${item.price * item.count}$</div>
                    </div>
                `).join('')}
            </div>
            <div class="modal-order-total">Total: ${totalPrice(order)}$</div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger modal-cancel">Cancel</button>
            <button type="button" class="btn btn-outline-success modal-confirm">Confirm</button>
        </div>
    `;

    // Create a container div for modalContent
    const modalContentDiv = document.createElement('div');
    modalContentDiv.appendChild(modalContent);

    // Append the container div to the modal
    modal.innerHTML = '';
    modal.appendChild(modalContentDiv);
    modal.classList.add('show');
    console.log("Modal shown");

    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        // currentOrder = [];
        modal.classList.remove('show');
        displayorder(currentOrder);
    });

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        currentOrder = [];
        modal.classList.remove('show');
        displayorder(currentOrder);
    });

    modal.querySelector('.modal-confirm').addEventListener('click', () => {
        totalSum += totalPrice(order);
        displayTotalEarnings();
        modal.classList.remove('show');
        displayReceiptModal(order);
    });
}

// Create a modal that displays the order with the total price and two buttons: Confirm and Cancel
function displayReceiptModal(order) {
    const modal = document.getElementById('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    let orderItems = [];
    order.forEach((item) => {
        let orderItem = orderItems.find((orderItem) => {
            return orderItem.id == item.id && orderItem.name == item.name && orderItem.price == item.price;
        });
        if (orderItem) {
            orderItem.count++;
        }
        else {
            orderItems.push({id: item.id, name: item.name, price: item.price, count: 1});
        }
    });

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">Receipt</h3>
            <h5 class="modal-title">Order #${currentIndex}</h5>
            <button type="button" class="btn-close modal-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="modal-order">
                ${orderItems.map(item => `
                    <div class="modal-order-item">
                        <div class="modal-order-item-name">${item.name} x${item.count}</div>
                        <div class="modal-order-item-price">${item.price * item.count}$</div>
                    </div>
                `).join('')}
            </div>
            <div class="modal-order-total">Total: ${totalPrice(order)}$</div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-success modal-cancel">Close</button>
            <p class="receipt-info">Thank you for your order!</p>
            <p class="receipt-info">${new Date().toLocaleDateString()}</p>
        </div>
    `;

    // Create a container div for modalContent
    const modalContentDiv = document.createElement('div');
    modalContentDiv.appendChild(modalContent);

    // Append the container div to the modal
    modal.innerHTML = '';
    modal.appendChild(modalContentDiv);
    modal.classList.add('show');
    console.log("Modal shown");
    // Event listeners

    modal.querySelector('.modal-close').addEventListener('click', () => {
        currentOrder = [];
        modal.classList.remove('show');
        currentIndex++;
        displayorderNumber();
        displayorder(currentOrder);
    });

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        currentOrder = [];
        modal.classList.remove('show');
        currentIndex++;
        displayorderNumber();
        displayorder(currentOrder);
        sleep(1000).then(() => {
            alert("here\'s your order")
        });
    });
}


function displayorderNumber() {
    let orderNumber = document.getElementById('order-number');
    orderNumber.innerHTML = `Order #${currentIndex}`;
}

function displayTotalEarnings() {
    let totalEarnings = document.getElementById('total-earning');
    totalEarnings.innerHTML = `Total earnings: ${totalSum}$`;

}
function DisplayItems() {
    DisplayMenu(Food);
    DisplayMenu(Drinks);
    DisplayMenu(Sides);
    DisplayMenu(Desserts);
}

function totalPrice(order) {
    return order.reduce((total, item) => {
        return total + item.price;
    }, 0);
}

function GetMenuType(menu) {
    if (menu == Food) {
        return 'Main dish';
    }
    else if (menu == Drinks) {
        return 'Drinks';
    }
    else if (menu == Sides) {
        return 'Sides';
    }
    else if (menu == Desserts) {
        return 'Desserts';
    }
    return 'Menues'
}

DisplayItems();
displayorderNumber();
displayTotalEarnings();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}