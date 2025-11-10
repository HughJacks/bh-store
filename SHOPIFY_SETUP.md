# Shopify Integration Setup

## ✅ What's Been Completed

### 1. Shopify Client & API Integration
- Created GraphQL client (`/src/lib/shopify/client.ts`)
- Created type definitions (`/src/lib/shopify/types.ts`)
- Created product fetching functions (`/src/lib/shopify/products.ts`)
- Created cart management functions (`/src/lib/shopify/cart.ts`)

### 2. Cart State Management
- Created reactive cart store using Svelte 5 runes (`/src/lib/stores/cart.svelte.ts`)
- Cart persists to localStorage
- Automatically loads cart on page load
- Real-time cart count in header

### 3. Product Page Integration
- Page loader fetches product from Shopify (`/src/routes/+page.ts`)
- Falls back to local images if no Shopify images
- Displays real price from Shopify
- "Add to Cart" button is functional
- Cart count updates in real-time

### 4. Cart UI
- Cart drawer in layout
- Shows all cart items with quantities and prices
- Displays subtotal and total
- Checkout button that redirects to Shopify checkout

## 🎯 Next Steps

### 1. In Shopify Admin
Create a product with the handle `trough`:
- Go to Products → Add product
- Set title to "Trough"
- In the URL handle section, set it to exactly `trough`
- Add price ($500 or whatever you want)
- Upload your product images
- Add description
- Save

### 2. In Your Terminal
If you see rollup errors, run:
```bash
cd store
rm -rf node_modules package-lock.json
npm install
```

### 3. Test Your Integration
```bash
npm run dev
```

Then:
1. Visit http://localhost:5173
2. You should see product data from Shopify
3. Click "Add to Cart" - cart count should increase
4. Click "Cart (1)" in header to view cart
5. Click "Checkout" to go to Shopify's checkout

## 🔐 Environment Variables

Your `.env` file should have:
```env
PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
SHOPIFY_API_KEY=your-api-key
SHOPIFY_API_SECRET=your-api-secret
PUBLIC_SHOPIFY_API_VERSION=2025-10
```

## 📝 How It Works

1. **Page loads** → Fetches "trough" product from Shopify
2. **User clicks "Add to Cart"** → Creates cart if needed, adds item
3. **Cart persists** → Stored in localStorage with cart ID
4. **User clicks "Cart"** → Opens drawer showing cart items
5. **User clicks "Checkout"** → Redirects to Shopify checkout
6. **After purchase** → User returns to your site (via Redirect URLs you set in Shopify)

## 🚀 Future Enhancements

- Add quantity selector
- Add remove from cart button
- Add cart line item updates
- Create collections/catalog page
- Add customer login
- Add order history
- Add product search

## 🐛 Troubleshooting

**Cart not updating?**
- Check browser console for errors
- Verify your Storefront API token is correct
- Make sure you selected the right scopes

**Product not loading?**
- Make sure you created a product with handle "trough" in Shopify
- Check that product is set to "Active" in Shopify
- Verify your store domain is correct in `.env`

**Checkout not working?**
- Make sure you set Redirect URLs in your Shopify custom app
- Add both localhost and production URLs

