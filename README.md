# Sampath Portfolio - Complete Website

A modern, mobile-responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and NextAuth.js with IndexedDB for local data storage.

## Features

### 🎨 Design & UI
- **Mobile-First Responsive Design** - Optimized for all screen sizes
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark/Light Theme Support** - Beautiful gradient backgrounds
- **Accessibility** - WCAG compliant with proper ARIA labels

### 🔐 Authentication
- **NextAuth.js Integration** - Secure authentication system
- **Local Database** - IndexedDB with Dexie for client-side storage
- **Password Hashing** - bcryptjs for secure password storage
- **Session Management** - JWT-based sessions

### 📱 Mobile Responsive
- **Responsive Navigation** - Collapsible mobile menu
- **Touch-Friendly** - Optimized for mobile interactions
- **Performance** - Fast loading on all devices
- **Progressive Web App** - Installable on mobile devices

### 🚀 Technical Stack
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication for Next.js
- **Dexie** - IndexedDB wrapper for easy database operations
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

## Pages & Features

### 🏠 Home Page
- Hero section with call-to-action
- Feature cards with hover effects
- Mobile-responsive navigation
- Authentication-aware content

### 👤 About Page
- Personal introduction
- Skills showcase with progress bars
- Professional timeline
- Statistics and achievements

### 📝 Blog
- Dynamic blog posts from database
- Responsive card layout
- Category and tag system
- Individual post pages

### 💼 Portfolio
- Project showcase
- Technology stack display
- Interactive project cards
- Professional experience timeline

### 📞 Contact
- Contact form with database storage
- Social media links
- Location information
- Form validation and feedback

### 🔐 Authentication
- **Login Page** - Secure user authentication
- **Signup Page** - User registration with validation
- **Dashboard** - Protected user area
- **Session Management** - Automatic login/logout

### 💰 Pricing
- Three-tier pricing plans
- Feature comparison
- FAQ section
- Call-to-action sections

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sampathportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup

The application uses IndexedDB for local data storage. The database is automatically initialized with sample data when the application starts.

### Database Schema

- **Users** - User accounts and authentication
- **Posts** - Blog posts and content
- **ContactMessages** - Contact form submissions

### Sample Data

The application comes with pre-populated sample data:
- Sample user account (email: `sampath@example.com`, password: `password`)
- Sample blog posts
- Contact form functionality

## Authentication

### Default User Account
- **Email**: `sampath@example.com`
- **Password**: `password`

### User Registration
New users can register through the signup page. Passwords are securely hashed using bcryptjs.

## Mobile Responsiveness

The website is fully responsive and optimized for:
- **Mobile phones** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px+)
- **Large screens** (1440px+)

### Responsive Features
- Collapsible navigation menu
- Responsive typography
- Flexible grid layouts
- Touch-friendly buttons and forms
- Optimized images and media

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and themes
- Update `app/globals.css` for global styles
- Customize component styles in individual files

### Content
- Update personal information in the About page
- Add your own blog posts to the database
- Modify the portfolio projects
- Customize the contact information

### Features
- Add new pages in the `app/(components)` directory
- Create new components in `app/reusableComponents`
- Extend the database schema in `lib/db.ts`

## Performance

The application is optimized for performance:
- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Components load as needed
- **Caching** - Efficient data caching strategies

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: sampathyemjala@gmail.com
- LinkedIn: [Sampath Yemjala](https://linkedin.com/in/sampath-yemjala)
- GitHub: [sampathKumaryemjala](https://github.com/sampathKumaryemjala)

---

Built with ❤️ by Sampath Kumar Yemjala
