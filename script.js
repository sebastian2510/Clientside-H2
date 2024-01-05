const Food = [
    {
        id: 1,
        name: 'Burger',
        price: 5,
        description: 'Tasty cheeseburger',
    },
    {
        id: 2,
        name: 'Pizza',
        price: 10,
        description: 'Tasty pizza',
    },
    {
        id: 3,
        name: 'Hot Dog',
        price: 3,
        description: 'Tasty hot dog',
    }
];

const Drinks = [
    {
        id: 1,
        name: 'Coca Cola',
        price: 2,
        description: 'Tasty coca cola',
    },
    {
        id: 2,
        name: 'Sprite',
        price: 2,
        description: 'Tasty sprite',
    },
    {
        id: 3,
        name: 'Fanta',
        price: 2,
        description: 'Tasty fanta',
    }
];

const Sides = [
    {
        id: 1,
        name: 'Fries',
        price: 2,
        description: 'Tasty fries',
    },
    {
        id: 2,
        name: 'Onion Rings',
        price: 2,
        description: 'Tasty onion rings',
    },
    {
        id: 3,
        name: 'Salad',
        price: 2,
        description: 'Tasty salad',
    }
];

const Desserts = [
    {
        id: 1,
        name: 'Ice Cream',
        price: 2,
        description: 'Tasty ice cream',
    },
    {
        id: 2,
        name: 'Cake',
        price: 2,
        description: 'Tasty cake',
    },
    {
        id: 3,
        name: 'Pie',
        price: 2,
        description: 'Tasty pie',
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
let currentSum = 0;
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
            currentSum += item.price;
            DisplayOrder(currentOrder);
        });

        menuItem.querySelector(`.menu-item-remove`).addEventListener('click', () => {
            currentOrder = [...currentOrder.filter((orderItem) => {
                return orderItem.id != item.id || orderItem.name != item.name || orderItem.price != item.price;
            }), ...currentOrder.filter((orderItem) => {
                return orderItem.id == item.id && orderItem.name == item.name && orderItem.price == item.price;
            }).slice(1)]
            DisplayOrder(currentOrder);
        });
        menuContainer.appendChild(menuItem);
    });
}

function DisplayOrder(order) {
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
}

function DisplayItems() {
    DisplayMenu(Food);
    DisplayMenu(Drinks);
    DisplayMenu(Sides);
    DisplayMenu(Desserts);
}

function GetMenuType(menu) 
{
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