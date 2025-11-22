import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const productListBody = document.getElementById('product-list-body');
    const addProductForm = document.getElementById('add-product-form');

    async function loadProductsFromFirestore() {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = [];
            querySnapshot.forEach(docItem => {
                products.push({ id: docItem.id, ...docItem.data() });
            });
            renderProducts(products);
        } catch (err) {
            console.error("Error loading products:", err);
            productListBody.innerHTML = '<tr><td colspan="6">Failed to load products.</td></tr>';
        }
    }

    function renderProducts(products) {
        productListBody.innerHTML = '';
        if (!products || products.length === 0) {
            productListBody.innerHTML = '<tr><td colspan="6">No products found.</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${product.image}" alt="${product.name}" style="height:60px;"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₱${Number(product.price).toFixed(2)}</td>
                <td>${product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                <td>
                  <button class="edit-btn" data-id="${product.id}">Edit</button>
                  <button class="delete-btn" data-id="${product.id}">Delete</button>
                </td>
            `;
            productListBody.appendChild(row);
        });

        // attach handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                if (!confirm('Delete product ' + id + '?')) return;
                try {
                    await deleteDoc(doc(db, 'products', id));
                    await loadProductsFromFirestore();
                } catch (err) {
                    console.error('Delete failed', err);
                    alert('Delete failed - see console');
                }
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const row = btn.closest('tr');
                const nameCell = row.children[2];
                const catCell = row.children[3];
                const priceCell = row.children[4];
                const inStockCell = row.children[5];

                const newName = prompt('New name:', nameCell.textContent) || nameCell.textContent;
                const newCategory = prompt('New category:', catCell.textContent) || catCell.textContent;
                const newPrice = parseFloat(prompt('New price:', priceCell.textContent.replace('₱','')) || priceCell.textContent) || 0;
                const newInStock = confirm('Mark as in stock?');

                try {
                    const docRef = doc(db, 'products', id);
                    await updateDoc(docRef, {
                        name: newName,
                        category: newCategory,
                        price: newPrice,
                        inStock: newInStock
                    });
                    await loadProductsFromFirestore();
                } catch (err) {
                    console.error('Update failed', err);
                    alert('Update failed - see console');
                }
            });
        });
    }

    // Handle add product - save to Firestore
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = e.target['product-name'].value;
        const category = e.target['product-category'].value;
        const price = parseFloat(e.target['product-price'].value) || 0;
        const image = e.target['product-image'].value;
        const inStock = e.target['product-instock'].checked;

        const productData = { name, category, price, image, inStock };

        try {
            await addDoc(collection(db, "products"), productData);
            // reload products
            await loadProductsFromFirestore();
            document.getElementById('add-product-modal').style.display = 'none';
            e.target.reset();
            alert('Product saved successfully.');
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product. See console for details.');
        }
    });

    loadProductsFromFirestore();
});
