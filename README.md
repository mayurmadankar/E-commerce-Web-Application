# MERN E-commerce Website

## Overview
This is a **Full Stack E-commerce Website** built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**. The platform allows users to browse products, add items to the cart, make payments, and manage their orders.

## Features
- **User Authentication** (Register, Login, Logout) using JWT.
- **Product Management** (Add, Update, Delete products - Admin only).
- **Shopping Cart** (Add, Remove, Update quantity).
- **Order Processing** (Checkout, Payment, Order History).
- **Payment Gateway Integration** (Paypal).
- **Admin Dashboard** (Manage Products, Orders, and Users).
- **Responsive UI** for seamless experience on all devices.
- **Secure API** using authentication and authorization.

## Tech Stack
### Frontend:
- React.js
- Redux Toolkit (State Management)
- Tailwind CSS / Bootstrap (UI Styling)
- Axios (API Requests)

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt.js (Password Hashing)
- Cloudinary (Image Uploads)

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install Dependencies
#### Install Backend Dependencies
```sh
cd backend
npm install
```

#### Install Frontend Dependencies
```sh
cd frontend
npm install
```

### 3. Set Up Environment Variables
Create a **.env** file in the backend directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4. Run the Application
#### Start Backend Server
```sh
cd backend
npm start
```

#### Start Frontend Server
```sh
cd frontend
npm start
```

### 5. Open in Browser
```
http://localhost:3000
```

## API Endpoints
| Endpoint               | Method | Description                     |
|------------------------|--------|---------------------------------|
| /api/users/register   | POST   | Register a new user            |
| /api/users/login      | POST   | Authenticate user & get token  |
| /api/products        | GET    | Fetch all products             |
| /api/products/:id    | GET    | Fetch product details          |
| /api/cart            | POST   | Add item to cart               |
| /api/orders          | POST   | Create a new order             |

## Future Enhancements
- Implement Wishlist Functionality
- Advanced Search and Filtering
- Order Tracking System

## Contribution
Feel free to fork the repository and contribute. If you find any issues, please open an issue.

## License
This project is licensed under the **MIT License**.

---
Made with ❤️ by [Your Name](https://github.com/yourusername)
