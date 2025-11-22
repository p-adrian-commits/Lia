import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

// --- GLOBAL STATE ---
let products = []; // will be loaded from Firestore

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products = [];
    querySnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    displayProducts(products);
  } catch (err) {
    console.error('Error loading products:', err);
    const productContainer = document.getElementById('products');
    if (productContainer) productContainer.innerHTML = '<p>Failed to load products.</p>';
  }
}

function displayProducts(products) {
    const productContainer = document.getElementById('products');
    if (!productContainer) return;

    productContainer.innerHTML = "";

    products.forEach(product => {
        const price = Number(product.price) || 0;
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₱${price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    });

    // attach add-to-cart handlers
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            addToCart(id);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId || String(p.id) === String(productId));
    if (!product) return alert('Product not found');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ id: productId, name: product.name, price: Number(product.price)||0, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
}

// Auth state handling (if still needed)
onAuthStateChanged(auth, user => {
  if (user) {
    // user is signed in
  } else {
    // not signed in
  }
});

// initial load
document.addEventListener('DOMContentLoaded', loadProducts);
