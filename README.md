# Mostaqel - Freelancing Platform

Mostaqel is a full-stack freelancing platform built with Next.js and Node.js, providing a marketplace for freelancers and clients to connect and collaborate on projects.

## 🚀 Features

- **User Authentication**
  - Google and Microsoft OAuth integration
  - JWT-based authentication
  - Secure session management

- **Freelancer Features**
  - Profile management
  - Portfolio showcase
  - Rating and review system
  - Category-based specialization
  - Real-time messaging

- **Client Features**
  - Project posting
  - Freelancer search and filtering
  - Proposal management
  - Payment integration

- **Payment Integration**
  - PayPal integration
  - Stripe payment processing
  - Secure transaction handling

- **Real-time Features**
  - Live chat using Socket.IO
  - Real-time notifications
  - Instant messaging

## 🛠️ Tech Stack

### Frontend (Mostaqel-nextjs)
- Next.js 14
- React 18
- Material-UI
- Tailwind CSS
- Bootstrap
- Socket.IO Client
- i18next for internationalization
- Formik & Yup for form handling
- React Hook Form

### Backend (mostaqelCloneBackEnd)
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT Authentication
- PayPal SDK
- Stripe API
- Cloudinary for image handling
- Multer for file uploads

## 📦 Installation

### Frontend Setup
```bash
cd Mostaqel-nextjs
npm install
npm run dev
```

### Backend Setup
```bash
cd mostaqelCloneBackEnd
npm install
npm start
```

## 🔧 Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your_microsoft_client_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🏗️ Project Structure

### Frontend
```
Mostaqel-nextjs/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # Reusable components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom hooks
│   └── utils/         # Utility functions
├── public/            # Static files
└── styles/           # Global styles
```

### Backend
```
mostaqelCloneBackEnd/
├── controllers/      # Route controllers
├── models/          # Database models
├── routes/          # API routes
├── middlewares/     # Custom middlewares
├── uploads/         # File uploads
└── static/          # Static files
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Joi
- CORS protection
- Secure file uploads
- Environment variable protection

## 🌐 API Documentation

The API documentation is available at `/api-docs` when running the backend server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All contributors who have helped shape this project
