# E-Commerce Web Application

A full-stack e-commerce web application built with React and Node.js, featuring user authentication, product management, shopping cart, and payment integration.

## 🚀 Features

- **User Authentication**: Login/Register with JWT and Google OAuth
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Place orders and track order history
- **Payment Integration**: Stripe and Razorpay payment gateways
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Management**: Cloudinary integration for product images
- **User Profile**: Manage user information and preferences

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **Stripe & Razorpay** - Payment processing

## 📁 Project Structure

```
ecommerce-web/
├── backend/
│   ├── config/          # Database and service configurations
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── context/     # React context providers
    │   ├── pages/       # Page components
    │   └── assets/      # Static assets
    └── public/          # Public files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Stripe account (optional)
- Razorpay account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdsahbazkhan/ecommerce-web.git
   cd ecommerce-web
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run server
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

## 📱 Pages & Features

- **Home** - Hero section, featured products, latest collections
- **Collection** - Product catalog with filtering and search
- **Product** - Detailed product view with reviews
- **Cart** - Shopping cart management
- **Login/Register** - User authentication
- **Orders** - Order history and tracking
- **About** - Company information
- **Contact** - Contact form and information
- **FAQ** - Frequently asked questions
- **Privacy Policy** - Privacy policy page
- **Terms & Conditions** - Terms of service

## 🔧 API Endpoints

### User Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/google-auth` - Google OAuth

### Product Routes
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (admin)
- `PUT /api/product/update` - Update product (admin)
- `DELETE /api/product/remove` - Remove product (admin)

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables in your hosting platform
3. Ensure MongoDB Atlas is accessible

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update API endpoints to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.