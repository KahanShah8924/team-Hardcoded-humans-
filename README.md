# ReWear - Sustainable Fashion E-commerce Platform

A modern, responsive e-commerce website inspired by ThredUp, built with HTML, CSS, and JavaScript. ReWear promotes sustainable fashion through buying, selling, and renting pre-loved clothing items.

## 🌟 Features

### 🎯 Core Functionality
- **Buy**: Browse and purchase pre-loved fashion items
- **Sell**: Clean-out service with 50% off fees for first-time sellers
- **Rent**: Access designer fashion without commitment
- **Image Search**: Upload photos to find similar items

### 🎨 Design & UX
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile
- **Modern UI**: Clean, minimalistic design with green/white/yellow color scheme
- **Interactive Elements**: Hover effects, carousels, modals, and smooth animations
- **Accessibility**: Keyboard navigation and screen reader friendly

### 📱 Pages & Sections
- **Homepage**: Hero banner, product categories, seasonal picks, color palettes
- **Buy Page**: Product listings with advanced filters and sorting
- **Sell Page**: Clean-out process, pricing calculator, success stories
- **Rent Page**: Rental categories, process explanation, featured items
- **About Page**: Company story, team, environmental impact, awards

### 🛠 Technical Features
- **Carousel Navigation**: Auto-scrolling seasonal panels with manual controls
- **Filter System**: Category, brand, price, condition, and size filters
- **Search Functionality**: Image upload and camera integration
- **Shopping Cart**: Add items with real-time counter updates
- **Wishlist**: Heart items and track favorites
- **Newsletter Signup**: Email subscription with social media links

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone [repository-url]
   
   # Or download and extract the ZIP file
   ```

2. **Open the Project**
   ```bash
   cd rewear-website
   ```

3. **Run Locally**
   
   **Option A: Direct File Opening**
   - Simply open `index.html` in your web browser
   - Note: Some features may be limited due to CORS policies

   **Option B: Local Server (Recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the Website**
   - Open your browser and navigate to `http://localhost:8000`
   - The website should load with all features working

### File Structure
```
rewear-website/
├── index.html          # Main homepage
├── buy.html            # Product browsing page
├── sell.html           # Selling information page
├── rent.html           # Rental service page
├── about.html          # Company information page
├── css/
│   └── style.css       # All styling and responsive design
├── js/
│   └── script.js       # Interactive functionality
└── README.md           # This file
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#22c55e` - Main brand color
- **Dark Green**: `#16a34a` - Hover states and gradients
- **Yellow**: `#facc15` - Secondary accent color
- **Dark Yellow**: `#eab308` - Yellow hover states
- **White**: `#ffffff` - Background and text
- **Gray**: `#666666` - Secondary text
- **Light Gray**: `#f8fafc` - Section backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Components
- **Buttons**: Primary (green) and Secondary (yellow) styles
- **Cards**: Product cards, category cards, feature cards
- **Navigation**: Sticky header with mobile menu
- **Carousels**: Horizontal scrolling with navigation arrows
- **Modals**: Image search and other popup dialogs

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🔧 Customization

### Adding New Products
1. Edit the `products` array in `buy.html`
2. Add product objects with: `id`, `name`, `brand`, `price`, `originalPrice`, `image`, `condition`, `category`

### Modifying Colors
1. Open `css/style.css`
2. Find the color variables at the top
3. Update the hex values to match your brand

### Adding New Pages
1. Create a new HTML file following the existing structure
2. Include the same navigation and footer
3. Add page-specific styles to `style.css`

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📊 Performance Features

- **Lazy Loading**: Images load as they enter the viewport
- **Optimized Images**: Using Unsplash CDN for fast loading
- **Minimal Dependencies**: Only Font Awesome and Google Fonts
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Debounced Events**: Optimized scroll and resize handlers

## 🔒 Security Considerations

- **No Sensitive Data**: All data is client-side only
- **CORS Safe**: Uses external CDNs for fonts and icons
- **XSS Prevention**: Proper HTML escaping in JavaScript
- **Form Validation**: Client-side validation for user inputs

## 🚀 Deployment

### Static Hosting
The website can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository and enable Pages
- **AWS S3**: Upload files to an S3 bucket
- **Firebase Hosting**: Use Firebase CLI

### Custom Domain
1. Purchase a domain name
2. Configure DNS settings
3. Update the hosting provider settings
4. Update any hardcoded URLs in the code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **ThredUp**: Inspiration for the sustainable fashion concept
- **Unsplash**: High-quality stock photos
- **Font Awesome**: Icons used throughout the site
- **Google Fonts**: Inter font family

## 📞 Support

For questions or support:
- **Email**: hello@rewear.com
- **Phone**: 1-800-REWEAR
- **Address**: 123 Fashion Ave, New York, NY

## 🔄 Version History

- **v1.0.0**: Initial release with all core features
- Complete responsive design
- Interactive carousels and modals
- Buy, sell, rent, and about pages
- Image search functionality
- Newsletter signup
- Mobile-optimized navigation

---

**ReWear** - Style Sustainably. Wear Again. ♻️ 