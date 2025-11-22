/*
// Firebase imports (disabled)
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';
*/

// --- LOCAL MOCK DATA & STATE ---
// Removed sample products
let localProducts = [];

let localOrders = [
    { id: 'AGRI-8342', customer: 'John Doe', date: '2023-10-26', status: 'Delivered', total: 99.48 },
    { id: 'AGRI-5912', customer: 'Jane Smith', date: '2023-10-28', status: 'Shipped', total: 100.00 },
    { id: 'AGRI-7734', customer: 'Sam Wilson', date: '2023-11-01', status: 'Pending', total: 200.95 },
];

// --- AUTHENTICATION & INITIALIZATION ---

initializeAdmin(); // Direct init

function initializeAdmin() {
  setupEventListeners();
  updateDashboard();
}

function setupEventListeners() {
  document.getElementById('logout-btn').addEventListener('click', () => {
    console.log("Logout clicked, redirecting to login.");
    window.location.href = 'login.html';
  });
}

function updateDashboard() {
    const totalRevenue = localOrders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = localOrders.length;
    const totalProducts = localProducts.length;

    // Convert $ to Peso ₱
    document.querySelector('.card:nth-child(1) .card-value').textContent = `₱${totalRevenue.toFixed(2)}`;
    document.querySelector('.card:nth-child(2) .card-value').textContent = totalOrders;
    document.querySelector('.card:nth-child(3) .card-value').textContent = totalProducts;
}
