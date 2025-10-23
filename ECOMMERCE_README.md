# E-Commerce Application

A fully-functional e-commerce application built with Next.js 15, TypeScript, Tailwind CSS, and Stripe payment integration.

## 🎯 Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse 12+ products across multiple categories
- **Advanced Filtering**: 
  - Search by product name or description
  - Filter by category (Electronics, Accessories, Fitness)
  - Sort by name, price (low/high), or rating
- **Product Details**: Comprehensive product pages with images, ratings, features, and stock status
- **Responsive Design**: Mobile-first design that works on all devices

### 🛒 Cart Management
- Add products to cart with quantity selection
- Update quantities directly in the cart
- Remove items from cart
- Real-time cart total calculation with tax
- Persistent cart (stored in localStorage)
- Cart badge showing total items in navbar

### ❤️ Wishlist
- Save favorite products for later
- Move items from wishlist to cart
- Persistent wishlist (stored in localStorage)
- Wishlist badge in navbar

### 💳 Stripe Payment Integration
- Secure payment processing with Stripe
- Test mode with test card details provided
- Payment confirmation page
- Error handling for failed payments
- Tax calculation (8%)
- Free shipping

## 📁 Project Structure

```
app/
├── (components)/
│   ├── shop/              # Product listing page
│   │   └── [id]/          # Product detail page
│   ├── cart/              # Shopping cart page
│   ├── wishlist/          # Wishlist page
│   └── checkout/          # Checkout with Stripe
│       └── success/       # Order confirmation
├── api/
│   ├── create-payment-intent/  # Stripe payment API
│   └── webhook/
│       └── stripe/        # Stripe webhook handler
├── providers/
│   ├── CartProvider.tsx   # Cart state management
│   └── WishlistProvider.tsx  # Wishlist state management
└── reusableComponents/
    └── checkout/
        └── CheckoutForm.tsx  # Stripe payment form

public/
└── products.json          # Product catalog

types/
└── index.ts              # TypeScript interfaces

lib/
└── stripe.ts             # Stripe client initialization
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Stripe account (free test mode)

### Installation

1. **Clone the repository** (if not already done)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Stripe**:
   - Create a free account at [stripe.com](https://stripe.com)
   - Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

4. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Update `.env.local` with your Stripe keys:
     ```env
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
     STRIPE_SECRET_KEY=sk_test_your_key_here
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open the application**:
   - Navigate to [http://localhost:3000/shop](http://localhost:3000/shop)

## 💳 Testing Payments

Use these test card details for Stripe payments:

- **Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP Code**: Any 5 digits (e.g., `12345`)

More test cards: [Stripe Testing Guide](https://stripe.com/docs/testing)

## 🎨 Features Breakdown

### Product Listing (`/shop`)
- Grid layout with product cards
- Product images from Unsplash
- Real-time search functionality
- Category filtering
- Multiple sorting options
- Stock status indicators
- Add to cart from listing
- Quick add to wishlist

### Product Detail (`/shop/[id]`)
- Large product image
- Product description and features
- Star rating and review count
- Stock availability
- Quantity selector
- Add to cart with custom quantity
- Add/remove from wishlist
- Related product information

### Shopping Cart (`/cart`)
- List of all cart items
- Quantity adjustment controls
- Remove item functionality
- Subtotal, tax, and total calculation
- Continue shopping button
- Proceed to checkout button
- Empty cart state

### Wishlist (`/wishlist`)
- Grid view of saved products
- Date added tracking
- Move to cart functionality
- Remove from wishlist
- Empty wishlist state
- Stock status for wishlist items

### Checkout (`/checkout`)
- Order summary
- Stripe payment form
- Customer information (name, email)
- Secure payment processing
- Real-time error handling
- Loading states
- Test card information display

### Success Page (`/checkout/success`)
- Order confirmation
- Unique order number
- Next steps information
- Continue shopping options

## 🔧 Technical Implementation

### State Management
- **Context API**: Used for global cart and wishlist state
- **LocalStorage**: Persistent storage for cart and wishlist
- **React Hooks**: Custom hooks for cart and wishlist operations

### Payment Processing
- **Stripe Elements**: Secure payment form
- **Payment Intents API**: Server-side payment creation
- **Webhook Support**: Handle payment events

### Data Flow
1. Product data loaded from JSON file
2. User adds products to cart/wishlist
3. State updated in context providers
4. Changes persisted to localStorage
5. Checkout creates payment intent
6. Stripe processes payment
7. Success page confirms order

### Type Safety
- Full TypeScript implementation
- Defined interfaces for:
  - Product
  - CartItem
  - WishlistItem
- Type-safe API routes

## 🎨 Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects
- **Icons**: Lucide React icons

## 🔐 Security Features
- Environment variables for sensitive keys
- Server-side payment processing
- Stripe's built-in security
- HTTPS required for production
- Webhook signature verification

## 📊 Product Data

Products are stored in `public/products.json` with the following structure:

```json
{
  "id": "prod_001",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://image-url.com",
  "category": "Electronics",
  "stock": 50,
  "rating": 4.8,
  "reviews": 256,
  "features": ["Feature 1", "Feature 2"]
}
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Set environment variables
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+

## 📝 Environment Variables

Required variables:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key (starts with `pk_`)
- `STRIPE_SECRET_KEY`: Stripe secret key (starts with `sk_`)
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret (optional, for production)
- `NEXT_PUBLIC_APP_URL`: Your application URL

## 🎯 Next Steps / Future Enhancements

- [ ] User authentication
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Related products recommendations
- [ ] Product variants (size, color)
- [ ] Inventory management
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Shipping address management
- [ ] Multiple payment methods
- [ ] Discount codes/coupons
- [ ] Product search with filters
- [ ] Recently viewed products

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 🐛 Troubleshooting

### Payment not working
- Check Stripe API keys are correct
- Ensure you're using test mode keys
- Verify `.env.local` file exists and is loaded

### Cart/Wishlist not persisting
- Check browser localStorage is enabled
- Clear browser cache and try again

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version is 18+
- Delete `.next` folder and rebuild

## 📄 License

This project is part of a portfolio application.

## 👤 Author

Sampath Yemjala
- Full Stack Developer
- Portfolio: [Your Portfolio URL]
- GitHub: [Your GitHub]

