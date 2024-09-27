const menu = document.getElementById("menu");
const orderSummary = document.getElementById("order-summary");
const totalPriceElement = document.getElementById("total-price");

function getMenu(meals) {
  const req = new XMLHttpRequest();

  req.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`);
  req.send();

  req.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const meal = data.meals[0];
    /*
     // สร้าง pricetag และกำหนดราคาแบบสุ่ม
     function getRandomPrice(min, max) {
      const randomMultiplier = Math.random(); // ตัวเลขสุ่มระหว่าง 0 ถึง 1
      const range = max - min;
      const randomPrice = min + Math.floor(randomMultiplier * range);
      return randomPrice;
    }

    // ตัวอย่างการใช้ฟังก์ชัน
    const minPrice = 25; // ตั้งค่าต่ำสุด
    const maxPrice = 150; // ตั้งค่าสูงสุด
    const randomPrice = getRandomPrice(minPrice, maxPrice);*/

    let price;
    switch (meals) {
      case "Fish pie":
        price = 129;
        break;
        case "Sushi":
          price = 159;
          break;
          case "Burek":
        price = 59;
        break;
        case "Bistek":
        price = 289;
        break;
        case "Lasagne":
        price = 99;
        break;
        case "Kafteji":
        price = 79;
        break;
        case "Big Mac":
        price = 119;
        break;
        case "Sugar Pie":
        price = 69;
        break;
        case "Flamiche":
        price = 49;
        break;
      default:
        
    }    

    const html = ` 
      <div class="menu-item">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 100%;">
        <h3 class="menu-item__order">🔢Order : ${meal.idMeal}</h3>
        <h3 class="menu-item__name">🏷️ Name  :  #${meal.strMeal} </h3></br>
        <p class="menu-item__price">💵Price : ${price} THB</p>
        <p class="menu-item__category">✨Category: ${meal.strCategory}</p>
        <p class="menu-item__area">🔍Area: ${meal.strArea}</p>
        <div class="button" onclick="addToOrder('${meal.strMeal}', ${price})"> 
        <a href="#1">Add Menu</a>
      </div>
      
    `;
    
    menu.insertAdjacentHTML("beforeend", html);
  });
}

function addToOrder(name, price) {
  const listItem = document.createElement("li");
  listItem.textContent = `${name} - ${price} THB`;
  

  // เพิ่มปุ่มลบ
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.onclick = function () {
    removeItemFromOrder(listItem, price);
  };  

  listItem.appendChild(removeButton);
  orderSummary.appendChild(listItem);

  // เพิ่มราคารวม
  updateTotalPrice(price);

  // บันทึกใน localStorage
  saveOrderToLocalstorage({ name, price });
}

function removeItemFromOrder(item, price) {
  orderSummary.removeChild(item);

  // ลดราคารวม
  updateTotalPrice(-price);

  // ลบรายการที่ระบุออกจาก localStorage
  removeOrderFromLocalstorage(item.textContent);
}

function updateTotalPrice(amount) {
  const totalPrice = parseInt(totalPriceElement.textContent);
  totalPriceElement.textContent = totalPrice + amount;
}

function saveOrderToLocalstorage(orderItem) {
  const order = localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order"))
    : [];
  order.push(orderItem);
  localStorage.setItem("order", JSON.stringify(order));
}

function removeOrderFromLocalstorage(orderItemText) {
  const order = JSON.parse(localStorage.getItem("order"));
  const updatedOrder = order.filter(item => `${item.name} - ${item.price} THB` !== orderItemText);
  localStorage.setItem("order", JSON.stringify(updatedOrder));
}

function payAndClear() {
  localStorage.removeItem("order");
  orderSummary.innerHTML = "";
  totalPriceElement.textContent = "0";
  alert("Payment successful");
}

getMenu("Flamiche");
getMenu("Fish pie");
getMenu("Sushi");
getMenu("Burek");
getMenu("Bistek");
getMenu("Lasagne");
getMenu("Kafteji");
getMenu("Big Mac");
getMenu("Sugar Pie");
getMenu("Corba");
getMenu("Tamiya");
getMenu("Wontons");
