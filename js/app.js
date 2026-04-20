
// ====== Store (localStorage) ======
const STORE_KEY = "azura_store_v1";
const defaultStore = { cart: [], wishlist: [], user: null };
function loadStore() {
  try {
    return {
      ...defaultStore,
      ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}"),
    };
  } catch {
    return { ...defaultStore };
  }
}
function saveStore(s) {
  localStorage.setItem(STORE_KEY, JSON.stringify(s));
  updateBadges();
}
let store = loadStore();

const Store = {
  getCart: () => store.cart,
  getWishlist: () => store.wishlist,
  getUser: () => store.user,
  cartCount: () => store.cart.reduce((n, i) => n + i.qty, 0),
  cartSubtotal: () =>
    store.cart.reduce((s, i) => {
      const p = getProduct(i.id);
      return p ? s + p.price * i.qty : s;
    }, 0),
  addToCart(id, qty = 1) {
    const ex = store.cart.find((i) => i.id === id);
    if (ex) ex.qty += qty;
    else store.cart.push({ id, qty });
    saveStore(store);
    toast("Added to cart");
  },
  setQty(id, qty) {
    if (qty <= 0) {
      store.cart = store.cart.filter((i) => i.id !== id);
    } else {
      const it = store.cart.find((i) => i.id === id);
      if (it) it.qty = qty;
    }
    saveStore(store);
  },
  removeFromCart(id) {
    store.cart = store.cart.filter((i) => i.id !== id);
    saveStore(store);
  },
  clearCart() {
    store.cart = [];
    saveStore(store);
  },
  toggleWish(id) {
    if (store.wishlist.includes(id)) {
      store.wishlist = store.wishlist.filter((x) => x !== id);
      toast("Removed from wishlist");
    } else {
      store.wishlist.push(id);
      toast("Added to wishlist");
    }
    saveStore(store);
  },
  inWishlist: (id) => store.wishlist.includes(id),
  setUser(u) {
    store.user = u;
    saveStore(store);
  },
  logout() {
    store.user = null;
    saveStore(store);
  },
};

// ====== Helpers ======
function $(sel, ctx = document) {
  return ctx.querySelector(sel);
}
function $$(sel, ctx = document) {
  return Array.from(ctx.querySelectorAll(sel));
}
function fmt(n) {
  return "$" + n.toFixed(2);
}
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function getQuery(name) {
  return new URL(window.location.href).searchParams.get(name);
}

function toast(msg) {
  let t = $("#az-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "az-toast";
    t.className = "toast-az";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 1800);
}

// ====== Header / Footer / Mobile nav ======
function renderHeader() {
  const user = Store.getUser();
  const greet = user
    ? `<span class="d-none d-lg-inline text-muted small me-2">Hello, ${escapeHtml(user.name.split(" ")[0])}</span>`
    : "";
  return `
  <header class="az-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container-xl">
        <a class="navbar-brand" href="index.html">AZURA</a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <i class="bi bi-list fs-3"></i>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" data-route="index" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" data-route="shop" href="shop.html">Shop</a></li>
            <li class="nav-item"><a class="nav-link" data-route="shop-gaming" href="shop.html?cat=Gaming%20Setup">Gaming</a></li>
            <li class="nav-item"><a class="nav-link" data-route="shop-deals" href="shop.html?cat=Budget%20Deals">Deals</a></li>
            <li class="nav-item"><a class="nav-link" data-route="shop-smart" href="shop.html?cat=Smart%20Home">Smart Home</a></li>
          </ul>
          <form class="d-flex flex-grow-1 me-lg-3 my-2 my-lg-0" style="max-width:380px" onsubmit="event.preventDefault(); const q=this.querySelector('input').value.trim(); window.location='shop.html'+(q?'?q='+encodeURIComponent(q):'')">
            <div class="search-pill w-100">
              <i class="bi bi-search text-muted"></i>
              <input type="search" placeholder="Search devices, brands…" />
              <i class="bi bi-upc-scan text-muted" title="Scan"></i>
            </div>
          </form>
          <div class="d-flex align-items-center gap-1">
            ${greet}
            <a href="wishlist.html" class="icon-btn" aria-label="Wishlist">
              <i class="bi bi-heart fs-5"></i>
              <span class="icon-badge" id="wishBadge" style="display:none">0</span>
            </a>
            <a href="cart.html" class="icon-btn" aria-label="Cart">
              <i class="bi bi-bag fs-5"></i>
              <span class="icon-badge" id="cartBadge" style="display:none">0</span>
            </a>
            <a href="login.html" class="icon-btn" aria-label="Account">
              <i class="bi bi-person-circle fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="az-footer">
    <div class="container-xl">
      <div class="row g-4">
        <div class="col-12 col-md-4">
          <div class="brand-block">
            <div class="navbar-brand fs-3" style="color:var(--brand); font-weight:800;">AZURA</div>
            <p>Premium electronics, curated for every kind of tech lover. Fast delivery, easy returns, secure checkout.</p>
            <div class="d-flex gap-2 mt-3">
              <a href="#" class="icon-btn"><i class="bi bi-twitter-x"></i></a>
              <a href="#" class="icon-btn"><i class="bi bi-instagram"></i></a>
              <a href="#" class="icon-btn"><i class="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <h4>Shop</h4>
          <ul>
            <li><a href="shop.html?cat=Smartphones">Smartphones</a></li>
            <li><a href="shop.html?cat=Laptops">Laptops</a></li>
            <li><a href="shop.html?cat=Gaming%20Setup">Gaming</a></li>
            <li><a href="shop.html?cat=Smart%20Home">Smart Home</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-2">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="col-12 col-md-4">
          <h4>Newsletter</h4>
          <p class="text-muted small">Be first to hear about new arrivals and deals.</p>
          <form onsubmit="event.preventDefault(); toast('Subscribed!'); this.reset();" class="d-flex gap-2">
            <input type="email" required placeholder="Your email" class="input-az" />
            <button class="btn-primary-az">Join</button>
          </form>
        </div>
      </div>
      <div class="copyright text-center">© ${new Date().getFullYear()} AZURA. All rights reserved.</div>
    </div>
  </footer>`;
}

function renderMobileNav() {
  return `
  <nav class="mobile-nav">
    <a href="index.html" data-route="index"><i class="bi bi-house fs-5"></i><span>Home</span></a>
    <a href="shop.html" data-route="shop"><i class="bi bi-grid fs-5"></i><span>Shop</span></a>
    <a href="wishlist.html" data-route="wishlist"><i class="bi bi-heart fs-5"></i><span>Wishlist</span><span class="mn-badge" id="mnWishBadge" style="display:none">0</span></a>
    <a href="cart.html" data-route="cart"><i class="bi bi-bag fs-5"></i><span>Cart</span><span class="mn-badge" id="mnCartBadge" style="display:none">0</span></a>
    <a href="login.html" data-route="login"><i class="bi bi-person fs-5"></i><span>Profile</span></a>
  </nav>`;
}

function updateBadges() {
  const cn = Store.cartCount();
  const wn = Store.getWishlist().length;
  ["cartBadge", "mnCartBadge"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (cn > 0) {
        el.textContent = cn;
        el.style.display = "inline-flex";
      } else el.style.display = "none";
    }
  });
  ["wishBadge", "mnWishBadge"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (wn > 0) {
        el.textContent = wn;
        el.style.display = "inline-flex";
      } else el.style.display = "none";
    }
  });
}

function setActiveNav(route) {
  $$("[data-route]").forEach((a) => {
    if (a.dataset.route === route) a.classList.add("active");
  });
}

// ====== Product card ======
function badgeHtml(b) {
  if (!b) return "";
  const cls =
    b === "Sale" ? "badge-sale" : b === "New" ? "badge-new" : "badge-best";
  return `<span class="${cls}">${b}</span>`;
}
function ratingHtml(r, reviews) {
  return `<div class="product-rating"><span class="star"><i class="bi bi-star-fill"></i></span> ${r} <span class="text-muted">(${reviews})</span></div>`;
}
function productCardHtml(p) {
  const wish = Store.inWishlist(p.id);
  return `
  <div class="col">
    <div class="product-card">
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-img">
        <div class="badges">${badgeHtml(p.badge)}</div>
        <button class="wish-btn ${wish ? "active" : ""}" onclick="event.preventDefault(); Store.toggleWish('${p.id}'); this.classList.toggle('active'); this.querySelector('i').className = this.classList.contains('active')?'bi bi-heart-fill':'bi bi-heart';" aria-label="Wishlist">
          <i class="bi ${wish ? "bi-heart-fill" : "bi-heart"}"></i>
        </button>
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" />
      </a>
      <div class="product-info">
        <div class="product-brand">${escapeHtml(p.brand)}</div>
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-name">${escapeHtml(p.name)}</a>
        ${ratingHtml(p.rating, p.reviews)}
        <div class="product-price">
          <span class="now">${fmt(p.price)}</span>
          ${p.oldPrice ? `<span class="was">${fmt(p.oldPrice)}</span>` : ""}
        </div>
        <button class="btn-primary-az add-btn" onclick="Store.addToCart('${p.id}')"><i class="bi bi-bag-plus"></i> Add to cart</button>
      </div>
    </div>
  </div>`;
}

// ====== Mount shell ======
function mountShell(activeRoute) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  const mobileEl = document.getElementById("site-mobile-nav");
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();
  if (mobileEl) mobileEl.innerHTML = renderMobileNav();
  setActiveNav(activeRoute);
  updateBadges();
}
