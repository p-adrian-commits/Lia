import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const confirmBtn = document.getElementById('confirm-order-btn');
  const paymentMethodEl = document.getElementById('payment-method');
  const bankDetailsEl = document.getElementById('bank-details');
  const mayaDetailsEl = document.getElementById('maya-details');
  const gcashDetailsEl = document.getElementById('gcash-details');

  let total = 0;
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartItemsEl.innerHTML += `
        <div class="cart-item">
          <div>${item.name}</div>
          <div>Qty: ${item.quantity}</div>
          <div>₱${item.price}</div>
        </div>
      `;
    });
  }

  cartTotalEl.textContent = `Total: ₱${total.toFixed(2)}`;

  paymentMethodEl.addEventListener('change', () => {
    bankDetailsEl.classList.add('hidden');
    mayaDetailsEl.classList.add('hidden');
    gcashDetailsEl.classList.add('hidden');

    if (paymentMethodEl.value === 'bank') {
      bankDetailsEl.classList.remove('hidden');
    } else if (paymentMethodEl.value === 'maya') {
      mayaDetailsEl.classList.remove('hidden');
    } else if (paymentMethodEl.value === 'gcash') {
      gcashDetailsEl.classList.remove('hidden');
    }
  });

  confirmBtn.addEventListener('click', async () => {
    if (cart.length === 0) return alert('Cart is empty');

    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const order = {
      userId,
      items: cart,
      total,
      paymentMethod: paymentMethodEl.value,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    try {
      await addDoc(collection(db, "orders"), order);
      localStorage.removeItem('cart');
      alert('Order placed successfully');
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. See console for details.');
    }
  });
});
