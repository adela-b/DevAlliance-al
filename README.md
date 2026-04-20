# Azura — Premium Electronics Store

A clean, responsive static storefront for a consumer electronics brand. Azura is built with HTML, CSS, and vanilla JavaScript to showcase products, manage a cart, wishlist, and render a polished shopping experience without a backend.

## Features

- Responsive homepage with hero section, categories, best sellers, and new arrivals
- Product grid and product detail page
- Cart and checkout flows using local storage
- Wishlist support with toggleable favorites
- Login page with client-side user state storage
- Reusable header, footer, and toast notifications
- Lightweight static site with no build step

## Pages

- `index.html` — landing page with featured sections
- `shop.html` — product browsing page with filters
- `product.html` — individual product details
- `cart.html` — shopping cart overview
- `checkout.html` — checkout summary and order form
- `wishlist.html` — saved wishlist items
- `login.html` — login and account mockup

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5 (CSS utilities and grid)
- Bootstrap Icons
- LocalStorage for cart, wishlist, and user session

## Project Structure

- `index.html` — homepage layout
- `shop.html` — shop page layout
- `product.html` — single product page
- `cart.html` — cart page
- `checkout.html` — checkout page
- `wishlist.html` — wishlist page
- `login.html` — login page
- `css/styles.css` — main stylesheet
- `js/app.js` — app logic, rendering, and store management
- `js/data.js` — product catalog and sample data
- `images/` — product and marketing images

## Getting Started

### Option 1: Open locally

Open any `.html` file directly in your browser.

### Option 2: Use a local server

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Customization

- Add or update products in `js/data.js`
- Adjust styling in `css/styles.css`
- Change page content in the corresponding HTML files
- Use your own images in `images/`

## Notes

- This repository is a static mock storefront and does not include a backend or real payment processing.
- Cart, wishlist, and login state are persisted in browser `localStorage`.

## License

This project is provided as-is for demo and portfolio use.
