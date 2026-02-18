let products = [
    {id:1, name:"Laptop", price:50000},
    {id:2, name:"Phone", price:20000},
    {id:3, name:"Headphones", price:3000},
    {id:4, name:"Watch", price:4000}
];

let cart = [];
let total = 0;

// Display Products
function displayProducts(){
    let container = document.getElementById("productContainer");
    container.innerHTML = "";

    products.forEach(function(product){
        let col = document.createElement("div");
        col.className = "col-md-3";

        col.innerHTML = `
            <div class="card mb-3">
                <div class="card-body text-center">
                    <h5>${product.name}</h5>
                    <p>₹ ${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// Add To Cart
function addToCart(id){
    let selectedProduct = products.find(p => p.id === id);
    cart.push(selectedProduct);
    total += selectedProduct.price;
    updateCart();
}

// Update Cart
function updateCart(){
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach(function(item,index){
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";

        li.innerHTML = `
            ${item.name} - ₹ ${item.price}
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
        `;

        cartList.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

// Remove Item
function removeItem(index){
    total -= cart[index].price;
    cart.splice(index,1);
    updateCart();
}

displayProducts();
