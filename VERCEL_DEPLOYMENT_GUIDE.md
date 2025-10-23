# Vercel Deployment Guide

## ✅ Build Status
Your project builds successfully! You're ready to deploy to Vercel.

## 🚀 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. Configure Environment Variables

**In Vercel Dashboard:**
- Go to **Settings** → **Environment Variables**
- Add the following variables for **Production**, **Preview**, and **Development**:

#### Required Environment Variables

```env
# NextAuth Configuration
NEXTAUTH_SECRET=<generate-a-random-secret>
NEXTAUTH_URL=https://your-domain.vercel.app

# Stripe Configuration (from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Stripe Webhook Secret (from https://dashboard.stripe.com/webhooks)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

#### How to Generate NEXTAUTH_SECRET

**Option 1: Using OpenSSL (Linux/Mac)**
```bash
openssl rand -base64 32
```

**Option 2: Using PowerShell (Windows)**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Option 3: Online Generator**
- Visit: https://generate-secret.vercel.app/32

### 4. Set Up Stripe Webhook

After deploying to Vercel:

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Enter your webhook URL: `https://your-domain.vercel.app/api/webhook/stripe`
4. Select events to listen to (or select "Select all events")
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it as `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. **Redeploy** your Vercel app for the changes to take effect

### 5. Update NEXTAUTH_URL

After your first deployment:
1. Copy your Vercel production URL (e.g., `https://your-app.vercel.app`)
2. Update `NEXTAUTH_URL` in Vercel environment variables to your production URL
3. **Redeploy** the app

## 📝 Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_SECRET` | Secret for NextAuth JWT encryption | Random 32-character string |
| `NEXTAUTH_URL` | Your production URL | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key (safe to expose) | `pk_live_xxxxx` or `pk_test_xxxxx` |
| `STRIPE_SECRET_KEY` | Stripe secret key (keep private) | `sk_live_xxxxx` or `sk_test_xxxxx` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_xxxxx` |

## ⚠️ Important Notes

1. **Use Test Keys During Development**
   - Use `pk_test_` and `sk_test_` keys for testing
   - Switch to `pk_live_` and `sk_live_` for production

2. **Never Commit .env Files**
   - `.env.local` is already in `.gitignore`
   - Never push environment secrets to GitHub

3. **Variables Starting with NEXT_PUBLIC_**
   - These are exposed to the browser
   - Only use for non-sensitive data (like Stripe publishable key)

4. **After Adding/Changing Environment Variables**
   - Always **redeploy** your app in Vercel
   - Go to **Deployments** → Select latest → Click **Redeploy**

## 🔍 Build Warnings (Non-Critical)

Your build has some warnings that won't prevent deployment:

1. **Metadata warnings** - Viewport/themeColor in metadata exports (cosmetic)
2. **ESLint warnings** - Unused error variables in catch blocks (minor)
3. **React Hook warnings** - Missing dependencies in useEffect (functional but could be optimized)

These are all non-blocking and your app will work perfectly in production!

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] All environment variables added
- [ ] NEXTAUTH_SECRET generated and added
- [ ] NEXTAUTH_URL set to production URL
- [ ] Stripe keys added (test or live)
- [ ] Stripe webhook created and secret added
- [ ] App redeployed after env var changes
- [ ] Test authentication works
- [ ] Test e-commerce checkout works

## 🎉 Success!

Once deployed, your portfolio will be live at:
- **Production**: `https://your-app.vercel.app`
- **Custom Domain**: Can be configured in Vercel → Settings → Domains

## 📚 Helpful Links

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

