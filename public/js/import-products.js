// Advanced product importer with Firebase Storage upload and duplicate skipping.
// This file was generated automatically.
import { addDoc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";
import { auth, db } from '../js/firebase-config.js';

const products = [
  {
    "name": "Apple",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/apple.jpg"
  },
  {
    "name": "Lemon",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/lemon.jpg"
  },
  {
    "name": "Orange",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/orange.jpg"
  },
  {
    "name": "Ponkan",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/ponkan.jpg"
  },
  {
    "name": "Saba",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/saba.jpg"
  },
  {
    "name": "Saging",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/saging.jpg"
  },
  {
    "name": "Tundan",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "images/Products/Fruits/tundan.webp"
  },
  {
    "name": "Adoboc",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/adoboc.jpg"
  },
  {
    "name": "Liempo",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/liempo.jpg"
  },
  {
    "name": "Marble",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/Marble.jpg"
  },
  {
    "name": "Nz",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/NZ.jpg"
  },
  {
    "name": "Pchop",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/pchop.jpg"
  },
  {
    "name": "Slab",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/slab.jpg"
  },
  {
    "name": "Striploin",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/Striploin.jpg"
  },
  {
    "name": "Suki",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/suki.jpg"
  },
  {
    "name": "Sukiyaki",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "images/Products/Meat/sukiyaki.jpg"
  },
  {
    "name": "Bawang",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/bawang.webp"
  },
  {
    "name": "Beans",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/beans.jpg"
  },
  {
    "name": "Bellpepper",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/bellpepper.jpg"
  },
  {
    "name": "Cabbage",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/cabbage.jpg"
  },
  {
    "name": "Carrots",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/carrots.webp"
  },
  {
    "name": "Gabi",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/gabi.jpg"
  },
  {
    "name": "Garlic",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/garlic.jpg"
  },
  {
    "name": "Kalabasa",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/kalabasa.jpg"
  },
  {
    "name": "Kalamansi",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/kalamansi.webp"
  },
  {
    "name": "Luya",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/luya.jpg"
  },
  {
    "name": "Napa",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/napa.jpg"
  },
  {
    "name": "Onion",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/onion.jpg"
  },
  {
    "name": "Pipino",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/pipino.jpg"
  },
  {
    "name": "Potato",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/potato.jpg"
  },
  {
    "name": "Radish",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/Radish.jpg"
  },
  {
    "name": "Talong",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/talong.jpg"
  },
  {
    "name": "Tomato",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "images/Products/Veggies/tomato.jpg"
  },
  {
    "name": "Apollock",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/Apollock.jpg"
  },
  {
    "name": "Barra",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/barra.jpg"
  },
  {
    "name": "Chilean",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/chilean.jpg"
  },
  {
    "name": "Crazycut",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/crazycut.jpg"
  },
  {
    "name": "Jumboscallops",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/jumboscallops.jpg"
  },
  {
    "name": "Loins",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/loins.jpg"
  },
  {
    "name": "Pampano",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/pampano.jpg"
  },
  {
    "name": "Salmonbelly",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/salmonbelly.jpg"
  },
  {
    "name": "Salmonfillet",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/salmonfillet.jpg"
  },
  {
    "name": "Shrimp",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/shrimp.jpg"
  },
  {
    "name": "Tunabelly",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "images/Products/seafood/tunabelly.jpg"
  },
  {
    "name": "Apple",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/apple.jpg"
  },
  {
    "name": "Lemon",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/lemon.jpg"
  },
  {
    "name": "Orange",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/orange.jpg"
  },
  {
    "name": "Ponkan",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/ponkan.jpg"
  },
  {
    "name": "Saba",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/saba.jpg"
  },
  {
    "name": "Saging",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/saging.jpg"
  },
  {
    "name": "Tundan",
    "price": 0,
    "stock": 0,
    "category": "Fruits",
    "image": "public/images/Products/Fruits/tundan.webp"
  },
  {
    "name": "Adoboc",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/adoboc.jpg"
  },
  {
    "name": "Liempo",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/liempo.jpg"
  },
  {
    "name": "Marble",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/Marble.jpg"
  },
  {
    "name": "Nz",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/NZ.jpg"
  },
  {
    "name": "Pchop",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/pchop.jpg"
  },
  {
    "name": "Slab",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/slab.jpg"
  },
  {
    "name": "Striploin",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/Striploin.jpg"
  },
  {
    "name": "Suki",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/suki.jpg"
  },
  {
    "name": "Sukiyaki",
    "price": 0,
    "stock": 0,
    "category": "Meat",
    "image": "public/images/Products/Meat/sukiyaki.jpg"
  },
  {
    "name": "Bawang",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/bawang.webp"
  },
  {
    "name": "Beans",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/beans.jpg"
  },
  {
    "name": "Bellpepper",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/bellpepper.jpg"
  },
  {
    "name": "Cabbage",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/cabbage.jpg"
  },
  {
    "name": "Carrots",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/carrots.webp"
  },
  {
    "name": "Gabi",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/gabi.jpg"
  },
  {
    "name": "Garlic",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/garlic.jpg"
  },
  {
    "name": "Kalabasa",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/kalabasa.jpg"
  },
  {
    "name": "Kalamansi",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/kalamansi.webp"
  },
  {
    "name": "Luya",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/luya.jpg"
  },
  {
    "name": "Napa",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/napa.jpg"
  },
  {
    "name": "Onion",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/onion.jpg"
  },
  {
    "name": "Pipino",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/pipino.jpg"
  },
  {
    "name": "Potato",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/potato.jpg"
  },
  {
    "name": "Radish",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/Radish.jpg"
  },
  {
    "name": "Talong",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/talong.jpg"
  },
  {
    "name": "Tomato",
    "price": 0,
    "stock": 0,
    "category": "Veggies",
    "image": "public/images/Products/Veggies/tomato.jpg"
  },
  {
    "name": "Apollock",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/Apollock.jpg"
  },
  {
    "name": "Barra",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/barra.jpg"
  },
  {
    "name": "Chilean",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/chilean.jpg"
  },
  {
    "name": "Crazycut",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/crazycut.jpg"
  },
  {
    "name": "Jumboscallops",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/jumboscallops.jpg"
  },
  {
    "name": "Loins",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/loins.jpg"
  },
  {
    "name": "Pampano",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/pampano.jpg"
  },
  {
    "name": "Salmonbelly",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/salmonbelly.jpg"
  },
  {
    "name": "Salmonfillet",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/salmonfillet.jpg"
  },
  {
    "name": "Shrimp",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/shrimp.jpg"
  },
  {
    "name": "Tunabelly",
    "price": 0,
    "stock": 0,
    "category": "seafood",
    "image": "public/images/Products/seafood/tunabelly.jpg"
  }
];

function makeButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Import Products to Firestore (with image upload)';
  btn.style = 'padding:12px; font-size:16px; margin:8px;';
  btn.onclick = importProducts;
  document.body.prepend(btn);
}

async function productExistsByName(name) {
  try {
    const q = query(collection(db, 'products'), where('name', '==', name));
    const snap = await getDocs(q);
    return !snap.empty;
  } catch (err) {
    console.error('Exists check failed', err);
    return false;
  }
}

async function uploadImageAndGetUrl(imagePath) {
  try {
    // fetch the image from server as blob
    const resp = await fetch(imagePath, {cache: 'no-store'});
    if (!resp.ok) throw new Error('Failed to fetch image ' + imagePath);
    const blob = await resp.blob();

    const storage = getStorage();
    const filename = imagePath.split('/').pop();
    const sref = storageRef(storage, 'product_images/' + Date.now() + '_' + filename);
    await uploadBytes(sref, blob);
    const url = await getDownloadURL(sref);
    return url;
  } catch (err) {
    console.error('Upload failed for', imagePath, err);
    return imagePath; // fallback to original path
  }
}

async function importProducts() {
  if (!confirm('This will upload ' + products.length + ' products to Firestore (and upload images). Continue?')) return;
  let count = 0;
  for (const p of products) {
    try {
      const exists = await productExistsByName(p.name);
      if (exists) {
        console.log('Skipping existing product:', p.name);
        continue;
      }
      // upload image and get URL
      const imageUrl = await uploadImageAndGetUrl(p.image);
      const data = {
        name: p.name,
        category: p.category,
        price: p.price || 0,
        stock: p.stock || 0,
        image: imageUrl
      };
      await addDoc(collection(db, 'products'), data);
      count++;
      console.log('Imported', p.name);
    } catch (err) {
      console.error('Failed to import', p.name, err);
    }
  }
  alert('Import complete. Imported ' + count + ' products.');
}

// initialize
makeButton();
console.log('Importer loaded. Products count:', products.length);
