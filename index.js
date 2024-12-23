let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Renderizar productos
fetch("https://fakestoreapi.com/products/category/men's clothing")
  .then((res) => res.json())
  .then((products) => renderProducts(products))
  .catch((error) => console.error("Error al cargar productos:", error));

function renderProducts(products) {
  const container = document.getElementById("containerProducts");
  container.innerHTML = ""; // Limpiar contenido previo
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div>
             <article class="card-product">
               <header class="container-img-product">
                 <img
                   class="img-product"
                   src="${product.image}" 
                   alt="${product.title}"
                 />
               </header>
               <footer class="footer-products">
                 <span class="category-product">${product.category}</span>
                 <h2 class="name-product">${product.title}</h2>
                   <p class="card-price">$${product.price.toFixed(2)}</p>
               </footer>
                <button class="btn-product" onclick="addToCart(${
                  product.id
                }, '${product.title}', ${
      product.price
    })">Agregar al carrito</button>
             </article>
           </div>
         `;
    container.appendChild(card);
  });
}

// Agregar al carrito
function addToCart(id, title, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
    alert("Se agrego un producto que ya habias seleccionado al carrito");
  } else {
    cart.push({ id, title, price, quantity: 1 });
    alert("Se agrego un nuevo producto al carrito");
  }
  updateCart();
}

// Actualizar el carrito
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Renderizar carrito
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const total = (item.price * item.quantity).toFixed(2);
    const row = document.createElement("tr");
    row.innerHTML = `
           <td>${item.title}</td>
           <td>$${item.price.toFixed(2)}</td>
           <td>
             <input type="number" min="1" value="${
               item.quantity
             }" onchange="updateQuantity(${index}, this.value)">
           </td>
           <td>$${total}</td>
           <td><span class="remove" onclick="removeFromCart(${index})">Eliminar</span></td>
         `;
    cartItems.appendChild(row);
  });
}

// Actualizar cantidad
function updateQuantity(index, quantity) {
  cart[index].quantity = parseInt(quantity);
  updateCart();
}

// Eliminar del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  alert("Haz eliminado un producto");
}

// Cargar el carrito al iniciar la página
renderCart();

// Eliminar todos los productos
function clearCart() {
  cart = []; // Vacía el array del carrito
  updateCart(); // Actualiza el carrito en localStorage y en la vista
}

function buy(index) {

  const btnBuy = document.getElementById("buyBtn");
  btnBuy.addEventListener("click", () => {
    alert("La compra se ha realizado con exito");
    clearCart()
    renderCart();
  })

}

buy();