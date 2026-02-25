# 🛒 Bazario – Full-Stack E-commerce Application

**Live Links**  
User App: https://bazario-frontend-one.vercel.app/  
Admin Panel: https://bazario-admin-seven.vercel.app/dashboard  
GitHub: https://github.com/mdsahbazkhan/ecommerce-web  

Bazario is a full-stack MERN e-commerce application that supports user shopping experience along with a role-based admin panel for product and order management. The platform includes authentication, payment integration, image upload, and a responsive UI.

---

## 🚀 Key Features

### User Features
- User registration and login using JWT Authentication
- Google OAuth login
- Browse, search, and filter products
- Add to cart and manage quantities
- Place orders and view order history
- Secure online payments using Stripe and Razorpay
- Fully responsive design for mobile and desktop

### Admin Features
- Role-based Admin Authentication
- Add, update, and delete products (CRUD)
- Manage customer orders
- Admin Dashboard with:
  - Revenue insights
  - Order statistics
  - Product management
- View customer messages

### Additional Features
- Cloudinary integration for product image upload
- RESTful API architecture
- Clean and modular folder structure

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Integrations
- JWT Authentication
- Google OAuth
- Cloudinary
- Stripe
- Razorpay

---

## 📁 Project Structure


ecommerce-web/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── assets/
└── public/


---

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside the backend folder:


PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id

STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret


---

## ▶️ Run Locally

### Backend Setup

cd backend
npm install
npm run server


### Frontend Setup

cd frontend
npm install
npm run dev


Frontend will run on:  
http://localhost:5173  

Backend will run on:  
http://localhost:8000  

---

## 📌 Project Highlights

- Full-stack MERN architecture
- Separate User and Admin applications
- Role-based access control
- Real-world e-commerce workflow
- Payment gateway integration
- Cloud-based image storage
- Deployed on Vercel

---

## 📬 Contact

**Md Sahbaz Alam**  
Email: amdsahbaz19@gmail.com  
LinkedIn: https://www.linkedin.com/in/sahbaz-alam-a95680262/  
GitHub: https://github.com/mdsahbazkhan
