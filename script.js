// Select all buttons inside .menu-item
const addButtons = document.querySelectorAll(".menu-item button");
const orderList = document.createElement("ul");
const totalDisplay = document.createElement("p");
const placeOrderBtn = document.createElement("button");

document.querySelector(".container").appendChild(orderList); // Append orderList to the container 
document.querySelector(".container").appendChild(totalDisplay); // Append totalDisplay to the container
document.querySelector(".container").appendChild(placeOrderBtn); // Append placeOrderBtn to the container

placeOrderBtn.innerText = "🧾 Place Order";
placeOrderBtn.classList.add("place-order-btn");
totalDisplay.classList.add("total-display");
console.log(placeOrderBtn);


let order = []; // Array to store order items
console.log(order);

addButtons.forEach(button => { // Select each button
  console.log(`Adding event listener to button: ${button}`);
  button.addEventListener("click", () => { // Add click event listener to each button 
    const itemElement = button.closest(".menu-item"); // Find the closest .menu-item element
    const name = itemElement.querySelector("h3").innerText; // Get the name of the item
    const priceText = itemElement.querySelector("p").innerText; // Get the price of the item
    console.log(`Adding ${name} to order...`);
    console.log(`Price: ${priceText}`);
    
    const price = guessPrice(name); // Function to simulate price

    const existingItem = order.find(item => item.name === name); // Check if the item already exists in the order
    console.log(`Existing item: ${existingItem}`);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      order.push({ name, price, quantity: 1 });
    }

    updateOrderDisplay();
  });
});

function updateOrderDisplay() {  // Function to update the order display
  orderList.innerHTML = ""; // Clear the order list
  let total = 0; // Initialize total to 0

  order.forEach(item => { // Loop through each item in the order
    const li = document.createElement("li");
    li.innerText = `${item.name} x ${item.quantity} = Rs ${item.quantity * item.price}`;
    orderList.appendChild(li);
    console.log(orderList);
    // apply css class for orderlist
    orderList.classList.add("order-list");
    
    total += item.price * item.quantity;
  });

  totalDisplay.innerText = `Total: Rs ${total}`;
}

// placeOrderBtn.addEventListener("click", () => {
//   if (order.length === 0) {
//     alert("👀 Please add items to your order.");
//     return;
//   }
// //   open order-summary.html page to place order

    
//   alert("✅ Order placed successfully!");
//   console.log("🧾 Order Summary:", order);

//   // Clear the order
//   order = [];
//   updateOrderDisplay();
// });

// Simulate price by name

 
placeOrderBtn.addEventListener("click", () => {  // Function to handle order placement
    if (order.length === 0) {
      alert("👀 Please add items to your order.");
      return;
    }
  
    // Store order and table info in localStorage
    localStorage.setItem("orderItems", JSON.stringify(order));  // Store the order
    localStorage.setItem("selectedTable", selectedTable);  // Store the table
  
    // Open the order-summary.html page in a new tab
    window.open("order-summary.html", "_blank");
  
    // alert("✅ Order placed successfully!"); //
    console.log("🧾 Order Summary:", order);
  
    // Clear the order
    order = [];
    updateOrderDisplay();
  });
  
function guessPrice(name) { // Function to simulate price based on name
  // Simulate prices based on item names
  const prices = {
    "Classic Burger": 250,
    "Cheese Pizza": 300,
    "Chicken Alfredo": 400,
    "Mojito": 120,
    "Fry Fish": 350,
    "Tuna Steak": 450
  };
  return prices[name] || 100;
}

const selectedTable = localStorage.getItem("selectedTable");

if (selectedTable) {
  document.getElementById("table-info").innerText = `🪑 You selected: ${selectedTable}`;
}

