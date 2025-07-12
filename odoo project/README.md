# ReWear - Sustainable Fashion Marketplace

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that replicates the functionality of ThredUp, a sustainable fashion marketplace where users can buy and sell pre-loved clothing and accessories.

## 🌟 Features

### For Buyers

- **Browse Products**: Search and filter through thousands of pre-loved items
- **Advanced Filtering**: Filter by category, brand, condition, size, color, and price range
- **Product Details**: View detailed product information with multiple images
- **Shopping Cart**: Add items to cart and manage quantities
- **Secure Checkout**: Complete purchases with multiple payment options
- **Order Tracking**: Track order status and delivery
- **Wishlist**: Save favorite items for later

### For Sellers

- **Easy Listing**: Create product listings with detailed information
- **Image Upload**: Upload multiple product images
- **Inventory Management**: Manage your product listings
- **Sales Tracking**: Monitor your sales and earnings
- **Condition Assessment**: Rate your items accurately

### General Features

- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Search**: Instant search results with suggestions
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Admin Panel**: Manage users, products, and orders

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

### Frontend

- **React.js** - UI library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rewear
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rewear
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

5. **Start MongoDB**

   Make sure MongoDB is running on your system. If you're using MongoDB locally:

   ```bash
   mongod
   ```

6. **Run the application**

   **Development mode (both frontend and backend):**

   ```bash
   npm run dev
   ```

   **Or run them separately:**

   Backend:

   ```bash
   npm run server
   ```

   Frontend:

   ```bash
   npm run client
   ```

7. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
rewear/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products

- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (seller only)
- `PUT /api/products/:id` - Update product (seller only)
- `DELETE /api/products/:id` - Delete product (seller only)
- `GET /api/products/brands` - Get all brands
- `GET /api/products/categories` - Get all categories

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist

## 🎨 Key Features Implementation

### 1. Product Search and Filtering

- Full-text search across product titles, descriptions, and brands
- Advanced filtering by category, brand, condition, size, color, and price range
- Real-time search suggestions
- URL-based filter state management

### 2. Shopping Cart

- Persistent cart storage
- Quantity management
- Real-time cart updates
- Secure checkout process

### 3. User Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control

### 4. Product Management

- Multi-image upload support
- Detailed product information
- Condition assessment system
- Inventory tracking

### 5. Order Management

- Complete order lifecycle
- Status tracking
- Payment integration ready
- Shipping information

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Express-validator for data validation
- **CORS Protection**: Cross-origin resource sharing configuration
- **Rate Limiting**: API rate limiting to prevent abuse
- **Helmet**: Security headers middleware

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git

### Frontend Deployment (Netlify/Vercel)

1. Build the React app: `npm run build`
2. Deploy the `build` folder to your preferred hosting service

### Database

- Use MongoDB Atlas for production database
- Set up proper connection strings
- Configure network access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by ThredUp's sustainable fashion marketplace
- Built with modern web technologies
- Focused on user experience and sustainability

## 📞 Support

For support, email support@rewear.com or create an issue in the repository.

---

**ReWear** - Making fashion sustainable, one piece at a time. ♻️
