# Arebian Mart - Premium Cake Ingredients Store

A modern, fully functional e-commerce website for a cake ingredients store located in Al-Birr Mosque, House 105, Oromia, Ethiopia.

## Features

- **Home Page** - Hero section, product showcase, and features
- **Order Page** - Browse products, add to cart, and place orders
- **Location Page** - Store location and contact information
- **Contact Page** - Email form with EmailJS integration
- **Admin Panel** - Full CRUD operations for products and order management
- **Firebase Integration** - Real-time data sync between website and admin panel
- **Fluid Animations** - Smooth scroll-triggered animations with Framer Motion

## Tech Stack

- Next.js 14 (Static Export)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase (Firestore, Auth, Storage)
- EmailJS (Contact Form)
- Lucide React (Icons)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd arebian-mart
npm install
```

### 2. Set Environment Variables in Vercel

Go to your Vercel project dashboard → **Settings** → **Environment Variables** and add these:

| Variable | Value | Where to find |
|----------|-------|---------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your API key | Firebase Console → Project Settings → General |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `arebian-mart.firebaseapp.com` | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `arebian-mart` | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `arebian-mart.firebasestorage.app` | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1065876594812` | Firebase Console |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:1065876594812:web:dfa61c7f8b3634a5ada9f9` | Firebase Console |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Your EmailJS service ID | EmailJS Dashboard |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | EmailJS Dashboard |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS public key | EmailJS Dashboard → Account |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `admin@arebianmart.com` | Your choice |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Your secure password | Your choice |

**IMPORTANT**: Replace the Firebase API key with your own. The one shown is a placeholder.

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing "arebian-mart"
3. Enable **Firestore Database**
4. Create collections: `products` and `orders`
5. Copy config values from **Project Settings → General → Your apps → Web**

### 4. Setup EmailJS (Optional - for contact form)

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create an account
3. Create a service and email template
4. Add credentials to Vercel environment variables

### 5. Build and Deploy

```bash
npm run build
```

This creates a static export in the `dist` folder.

### 6. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

#### Option B: Git Integration (Recommended)
1. Push code to GitHub (`.env.local` is gitignored automatically)
2. Import project in Vercel dashboard
3. Add environment variables in Vercel dashboard
4. Deploy

#### Option C: Manual Upload
1. Run `npm run build`
2. Upload the `dist` folder to Vercel

## Admin Panel Access

- URL: `/admin`
- Default credentials (change in Vercel env vars):
  - Email: `admin@arebianmart.com`
  - Password: `change_this_password`

## Project Structure

```
arebian-mart/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with Navbar & Footer
│   │   ├── page.tsx        # Home page
│   │   ├── globals.css     # Global styles
│   │   ├── location/
│   │   │   └── page.tsx    # Location page
│   │   ├── order/
│   │   │   └── page.tsx    # Order page
│   │   ├── contact/
│   │   │   └── page.tsx    # Contact page
│   │   └── admin/
│   │       └── page.tsx    # Admin dashboard
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Footer.tsx      # Footer
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Products.tsx    # Products showcase
│   │   └── Features.tsx    # Features section
│   └── utils/
│       └── firebase.ts     # Firebase configuration
├── public/
│   └── images/             # Static images
├── next.config.js          # Next.js config with static export
├── tailwind.config.js      # Tailwind CSS config
└── package.json
```

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
- `accent` - Primary brand color (default: #c8956c)
- `chocolate` - Dark text color (default: #3d2817)
- `cream` - Background color (default: #faf6f1)

### Animations
All animations are powered by Framer Motion. Edit components to customize:
- Scroll-triggered reveals
- Hover effects
- Page transitions
- Loading states

## License

MIT License - Feel free to use for your own projects.

---

**Made with love for Arebian Mart, Al-Birr, Oromia, Ethiopia**