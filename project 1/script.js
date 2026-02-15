/* ================= GLOBAL VARIABLES ================= */
let cartCount = 0;
let isLoggedIn = false;

/* Dummy user data (for demo purpose) */
let user = {
    email: "saurav@freshfruits.com",
    password: "123456"
};

/* ================= ELEMENT REFERENCES ================= */
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const cartBtn = document.getElementById("cart-btn");

const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const cartCountSpan = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

/* ================= MODAL CONTROLS ================= */
loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
    signupModal.style.display = "none";
});

signupBtn.addEventListener("click", () => {
    signupModal.style.display = "block";
    loginModal.style.display = "none";
});

/* Close modal when clicking outside */
window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === signupModal) signupModal.style.display = "none";
});

/* ================= SIGNUP LOGIC ================= */
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all signup fields");
        return;
    }

    user.email = email;
    user.password = password;

    alert("Signup successful! You can now login.");
    signupModal.style.display = "none";
});

/* ================= LOGIN LOGIC ================= */
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email === user.email && password === user.password) {
        isLoggedIn = true;
        alert("Login successful!");
        loginModal.style.display = "none";
        loginBtn.innerText = "Logged In";
    } else {
        alert("Invalid email or password");
    }
});

/* ================= ADD TO CART LOGIC ================= */
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (!isLoggedIn) {
            alert("Please login to add items to cart");
            loginModal.style.display = "block";
            return;
        }

        cartCount++;
        cartCountSpan.innerText = cartCount;

        button.innerText = "Added ✔";
        button.disabled = true;
    });
});

/* ================= CART BUTTON ================= */
cartBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
        alert("Please login to view cart");
        loginModal.style.display = "block";
        return;
    }

    alert("You have " + cartCount + " item(s) in your cart.");
});
