# Stripe Testing Guide

## 🧪 Testing Your Checkout Flow

### Test Card Numbers

When testing your Stripe integration in **test mode**, use these card numbers:

#### ✅ Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### ❌ Card Declined
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### ⚠️ Insufficient Funds
```
Card Number: 4000 0000 0000 9995
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### 🔐 3D Secure Authentication Required
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### How to Test

1. **Add Items to Cart**
   - Go to `/shop`
   - Click "Add to Cart" on any products
   - Click "View Cart" or navigate to `/cart`

2. **Proceed to Checkout**
   - Click "Proceed to Checkout" button
   - You'll be redirected to `/checkout`

3. **Fill in Payment Details**
   - Enter your name
   - Enter your email
   - **Fill in billing address** (required for Indian export regulations):
     - Address Line 1: `123 Main St`
     - Address Line 2: (optional)
     - City: `New York`
     - State/Province: `NY`
     - Postal Code/ZIP: `10001`
     - Country: Select from dropdown
   - Use one of the test card numbers above
   - Fill in expiry, CVC

4. **Complete Payment**
   - Click "Pay $XX.XX"
   - You should see "Processing..." 
   - Stripe will redirect to `/checkout/success`
   - Your cart will be automatically cleared

### What Should Happen

✅ **On Success:**
- Loading spinner shows "Confirming your payment..."
- Success page displays with green checkmark
- Order number is generated
- Cart is cleared
- Can click "Continue Shopping" or "Back to Home"

❌ **On Failure:**
- Error message appears on checkout page
- "Processing..." stops
- Cart items remain
- You can try again

### Indian Export Regulations Compliance

As per [Stripe's India export regulations](https://stripe.com/docs/india-exports), all export transactions require:

✅ **Customer Name** - Full name of the cardholder  
✅ **Customer Email** - Valid email address  
✅ **Complete Billing Address** - Including street, city, state, postal code, and country  
✅ **Transaction Description** - Automatically generated from cart items  

These fields are **mandatory** and the form won't submit without them.

### Common Issues

#### "Missing required fields error"
**Solution:** 
- Make sure all required fields are filled (marked with red asterisk *)
- Billing address fields are mandatory for export compliance
- Postal code/ZIP must be valid for the selected country

#### "Payment not redirecting to success page"
**Solution:** 
- Make sure you're using Stripe test keys (start with `pk_test_` and `sk_test_`)
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Ensure `STRIPE_SECRET_KEY` is set in environment variables

#### "Cart not clearing after payment"
**Solution:** This is now fixed! The cart clears automatically when you reach the success page.

#### "Getting errors about client_secret"
**Solution:**
- Make sure payment intent is being created properly
- Check `/api/create-payment-intent` is working
- Verify your Stripe secret key is correct

### Environment Variables for Testing

```env
# Use TEST keys for development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### Webhook Testing (Local Development)

1. **Install Stripe CLI**
   ```bash
   # Download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward Webhooks to Localhost**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```

4. **Copy Webhook Secret**
   ```bash
   # The CLI will display: whsec_xxxxx
   # Add this to your .env.local
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

5. **Test Webhooks**
   ```bash
   # In another terminal
   stripe trigger payment_intent.succeeded
   ```

### Testing Different Scenarios

| Scenario | Test Card | Expected Result |
|----------|-----------|----------------|
| Normal Payment | 4242 4242 4242 4242 | Success page |
| Declined Card | 4000 0000 0000 0002 | Error: "Your card was declined" |
| Insufficient Funds | 4000 0000 0000 9995 | Error: "Insufficient funds" |
| Expired Card | 4000 0000 0000 0069 | Error: "Your card has expired" |
| CVC Check Fails | 4000 0000 0000 0127 | Error: "CVC check failed" |

### Next Steps

1. **Test the Full Flow**
   - Add items to cart
   - Proceed to checkout
   - Use test card: 4242 4242 4242 4242
   - Complete payment
   - Verify redirect to success page
   - Check cart is empty

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for any errors
   - Check Network tab for API calls

3. **Production Setup**
   - Switch to live keys (`pk_live_` and `sk_live_`)
   - Set up production webhook endpoint
   - Test with real small amounts first

## 📚 Resources

- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
- [Payment Intents API](https://stripe.com/docs/api/payment_intents)
- [Webhooks Guide](https://stripe.com/docs/webhooks)

## ✅ Quick Test Checklist

- [ ] Stripe test keys configured
- [ ] Can add items to cart
- [ ] Can view cart
- [ ] Can proceed to checkout
- [ ] Payment form loads with all required fields
- [ ] Can enter customer name and email
- [ ] Can enter complete billing address (street, city, state, ZIP, country)
- [ ] Can enter test card details
- [ ] Form validates required fields
- [ ] "Pay" button works
- [ ] Shows "Processing..." state
- [ ] Redirects to success page
- [ ] Cart is cleared on success
- [ ] Can handle declined cards
- [ ] Error messages display properly

---

**Need Help?**
- Check browser console for errors
- Verify all environment variables are set
- Make sure you're using test mode keys
- Review Stripe dashboard for payment logs

