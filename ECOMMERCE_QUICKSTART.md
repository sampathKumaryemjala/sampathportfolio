# E-Commerce Quick Start Guide

Get your e-commerce store running in 5 minutes! 🚀

## ⚡ Quick Setup

### 1. Get Stripe Keys (2 minutes)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up for a free account
3. Navigate to [Developers → API Keys](https://dashboard.stripe.com/test/apikeys)
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### 2. Configure Environment (1 minute)

Create a file named `.env.local` in your project root:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Install & Run (2 minutes)

```bash
# Install dependencies (if not done already)
npm install

# Start the development server
npm run dev
```

### 4. Visit the Shop

Open [http://localhost:3000/shop](http://localhost:3000/shop) in your browser!

## 🎯 Routes

| Route | Description |
|-------|-------------|
| `/shop` | Browse all products |
| `/shop/[id]` | View product details |
| `/cart` | View shopping cart |
| `/wishlist` | View saved items |
| `/checkout` | Complete purchase |
| `/checkout/success` | Order confirmation |

## 💳 Test Payment

At checkout, use these test card details:

```
Card Number: 4242 4242 4242 4242
Expiry: 12/34 (any future date)
CVC: 123 (any 3 digits)
ZIP: 12345 (any 5 digits)
```

## ✨ Features to Try

1. **Search Products**: Use the search bar on the shop page
2. **Filter by Category**: Select Electronics, Accessories, or Fitness
3. **Sort Products**: Try different sorting options
4. **Add to Cart**: Click "Add to Cart" on any product
5. **Add to Wishlist**: Click the heart icon
6. **Update Quantity**: Use +/- buttons in cart
7. **Checkout**: Complete a test purchase
8. **Cart Badge**: Notice the cart count in the navbar
9. **Dark Mode**: Toggle dark/light theme
10. **Responsive**: Try on mobile/tablet

## 📱 Navigation Bar

The navigation bar now includes:
- **Shop** link in main menu
- **Wishlist** icon with count badge (heart icon)
- **Cart** icon with item count badge
- All existing navigation items

## 🎨 Key Components

### Context Providers (Global State)
- `CartProvider` - Manages shopping cart
- `WishlistProvider` - Manages wishlist

### Pages
- `shop/page.tsx` - Product listing with filters
- `shop/[id]/page.tsx` - Product details
- `cart/page.tsx` - Shopping cart
- `wishlist/page.tsx` - Saved products
- `checkout/page.tsx` - Payment processing

### API Routes
- `api/create-payment-intent` - Stripe payment creation
- `api/webhook/stripe` - Stripe event handling

## 🔧 Customization

### Add More Products

Edit `public/products.json`:

```json
{
  "id": "prod_XXX",
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://images.unsplash.com/photo-...",
  "category": "Electronics",
  "stock": 100,
  "rating": 4.5,
  "reviews": 50,
  "features": ["Feature 1", "Feature 2"]
}
```

### Change Tax Rate

In `cart/page.tsx` and `checkout/page.tsx`, find:
```typescript
(getTotalPrice() * 0.08)  // 8% tax
```

Change `0.08` to your desired rate (e.g., `0.10` for 10%)

### Modify Shipping

Currently set to FREE. To add shipping:

In `cart/page.tsx`, update the shipping section:
```typescript
<div className="flex justify-between text-gray-600 dark:text-gray-400">
  <span>Shipping</span>
  <span>$9.99</span>  // Changed from FREE
</div>
```

## 🚀 Going to Production

### 1. Get Production Stripe Keys
- Switch to "Live mode" in Stripe Dashboard
- Get live API keys (start with `pk_live_` and `sk_live_`)

### 2. Update Environment Variables
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 3. Set Up Webhooks (Optional but Recommended)
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret
5. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   ```

### 4. Deploy
- Vercel: Push to GitHub and connect
- Other: Build with `npm run build` and deploy

## 🎓 Learn More

- Full documentation: `ECOMMERCE_README.md`
- Stripe docs: [stripe.com/docs](https://stripe.com/docs)
- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

## 💡 Tips

- **Development**: Always use test mode keys
- **LocalStorage**: Cart and wishlist persist in browser
- **Stock**: Products show low stock warnings
- **Mobile**: Fully responsive design
- **Dark Mode**: Automatic theme support

## 🆘 Need Help?

Common issues:
- **Blank shop page**: Check `public/products.json` exists
- **Payment errors**: Verify Stripe keys in `.env.local`
- **Cart not saving**: Enable browser localStorage
- **Build errors**: Run `npm install` and try again

Enjoy building your e-commerce store! 🎉

