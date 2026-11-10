# Poshfera Leathers: React + Tailwind e-commerce

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Pages
Home, Shop (filters, sort, search), Product detail, Bag, Checkout (3 steps), Wishlist, Our Story, Contact, Sign in, 404.

## Sliders
- `src/components/HeroSlider.jsx`: auto-playing hero (5.5s), pauses on hover, arrows, progress indicators.
- `src/components/ProductCarousel.jsx`: infinite auto-scrolling product carousel, pauses on hover, drag-to-scroll, play/pause and arrow controls.
- Product detail page: auto-rotating image gallery with thumbnails and hover zoom.

## Images
All photos are free-to-use Unsplash images. Every ID is listed in `src/data/products.js` (`PHOTOS`), so changing a picture or adding your own product photos is a one-line edit.

## Notes
- Cart, wishlist and sign-in are saved in the browser (localStorage). Sign-in and payment are demo only; connect your own backend for real auth and payments.
- Stack: Vite, React 18, React Router 6, Tailwind CSS 3, Framer Motion, Lucide icons.
