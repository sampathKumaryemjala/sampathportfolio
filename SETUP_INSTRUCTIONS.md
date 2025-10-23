# Setup Instructions for Sampath Portfolio

## Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create a file named `.env.local` in the root directory with the following content:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random-123456789
```

**Important:** Replace `your-secret-key-here-make-it-long-and-random-123456789` with a secure random string.

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

- **Email**: `sampath@example.com`
- **Password**: `password`

## Features Now Working

✅ **Demo Authentication** - Hardcoded demo user for testing
✅ **User Login** - Login with demo credentials
✅ **Protected Dashboard** - User-specific area
✅ **Contact Form** - Demo form submission (no database)
✅ **Blog System** - Static content from JSON file
✅ **Mobile Responsive** - Works on all devices

## Data Storage

- **Users**: Hardcoded demo user (no database)
- **Posts**: Static content from `data/posts.json`
- **Contact Messages**: Demo mode only (console logged)
- **Registration**: Disabled in demo mode

## Authentication Flow

1. **Login**: Demo authentication with hardcoded user
2. **Dashboard**: Protected user area (requires login)
3. **Logout**: Session termination
4. **Sign Up**: Disabled in demo mode (use login credentials)

## Troubleshooting

### If you can't login:

1. **Check browser console** for any errors
2. **Ensure .env.local exists** with proper values
3. **Use correct credentials**: sampath@example.com / password
4. **Clear browser cache** and try again

### Common Issues:

- **"Invalid credentials"**: Make sure to use sampath@example.com / password
- **Sign up disabled**: This is a demo mode, use the login credentials
- **Dashboard not loading**: Ensure you're logged in first

## File Structure

```
├── lib/
│   ├── indexed-db.ts          # Client-side stub (for compatibility)
│   └── auth.ts               # NextAuth configuration (demo mode)
├── hooks/
│   └── useAuth.ts            # Authentication hook
├── data/
│   └── posts.json            # Static blog posts
└── .env.local               # Environment variables (create this)
```

## Next Steps

1. **Customize Content**: Update personal information in About page
2. **Add Blog Posts**: Edit data/posts.json to add new posts
3. **Modify Styling**: Update colors and themes
4. **Add Database**: Implement a real database if needed (MongoDB, PostgreSQL, etc.)
5. **Deploy**: Push to Vercel or your preferred platform

## Support

If you encounter any issues:
- Check the browser console for errors
- Ensure all dependencies are installed
- Verify the .env.local file exists
- Try clearing browser storage and refreshing
