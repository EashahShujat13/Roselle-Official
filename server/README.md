           SECTION 01 (AUTHENTICATION)

           
           # 🌸 Roselle Official Backend

## 📌 Project

Backend API for Roselle Official Jewelry Store.

Built with:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google OAuth
- Nodemailer
- Forgot Password Flow

---

# 📂 Folder Structure

server/

├── config/

├── controllers/

├── middleware/

├── models/

├── routes/

├── templates/

├── utils/

├── .env

├── package.json

└── server.mjs

---

# 📦 Libraries Used

## Express

Install

```bash
npm install express
```

Purpose

Create APIs and Routes.

---

## Mongoose

```bash
npm install mongoose
```

Purpose

Connect Node.js with MongoDB Atlas.

---

## MongoDB

```bash
npm install mongodb
```

Purpose

Official MongoDB Driver.

(Mongoose already uses it internally.)

---

## dotenv

```bash
npm install dotenv
```

Purpose

Store Secret Keys inside .env

Example

- Mongo URI
- JWT Secret
- Email
- App Password
- Google Client ID

---

## bcryptjs

```bash
npm install bcryptjs
```

Purpose

Hash Password before saving into MongoDB.

Functions Used

```js
bcrypt.hash()

bcrypt.compare()
```

---

## JWT

```bash
npm install jsonwebtoken
```

Purpose

Generate Login Token.

Functions Used

```js
jwt.sign()

jwt.verify()
```

---

## Nodemailer

```bash
npm install nodemailer
```

Purpose

Send Emails.

Used For

- Welcome Email
- Forgot Password Email

Main Concept

Transporter

```js
createTransport()
```

Send Mail

```js
sendMail()
```

---

## Google Auth

```bash
npm install google-auth-library
```

Purpose

Google Login.

Concepts Used

OAuth2Client

verifyIdToken()

payload

credential

Google Client ID

---

## CORS

```bash
npm install cors
```

Purpose

Allow React Frontend to communicate with Backend.

---

## Nodemon

```bash
npm install --save-dev nodemon
```

Purpose

Automatically Restart Server.

---

# Node Built-in Modules

(No Installation Required)

crypto

Purpose

Generate Reset Password Token.

Functions Used

```js
crypto.randomBytes()

crypto.createHash()
```

---

# Environment Variables

Create .env

```env
PORT=

MONGO_URI=

JWT_SECRET=

EMAIL=

APP_PASSWORD=

FRONTEND_URL=

GOOGLE_CLIENT_ID=
```

---

# Features Completed

## Authentication

✅ Signup

✅ Login

✅ Logout

✅ JWT Authentication

✅ Password Hashing

---

## Email

✅ Welcome Email

✅ Forgot Password Email

---

## Password Recovery

✅ Generate Reset Token

✅ Hash Reset Token

✅ Token Expiry

✅ Reset Password

---

## Google Login

✅ Google OAuth

✅ Verify Google Token

✅ Existing Email Login

✅ New User Signup

---

# Authentication Flow

Signup

↓

Hash Password

↓

Save User

↓

Send Welcome Email

↓

Login

↓

Compare Password

↓

Generate JWT

↓

Store Token

↓

Frontend Save Token

↓

Protected Routes

↓

Logout

↓

Remove JWT

---

Forgot Password

↓

Email Exists?

↓

Generate Random Token

↓

Hash Token

↓

Save Hash

↓

Expiry = 15 Minutes

↓

Send Email

↓

User Opens Link

↓

Hash URL Token

↓

Find User

↓

Update Password

↓

Clear Reset Token

---

Google Login

↓

Google Popup

↓

Credential Received

↓

Frontend Sends Credential

↓

Backend Verifies Credential

↓

Get Payload

↓

Find Email

↓

User Exists?

↓

Yes → Login

↓

No → Create User

↓

Generate JWT

↓

Frontend Saves JWT

---

# APIs

POST

/api/auth/signup

POST

/api/auth/login

POST

/api/auth/logout

POST

/api/auth/forgot-password

POST

/api/auth/reset-password/:token

POST

/api/auth/google-login

GET

/api/auth/users

---

# Important Concepts Learned

JWT

Password Hashing

Middleware

Authorization

Authentication

Google OAuth

Transporter

Nodemailer

Reset Password Flow

Environment Variables

MVC Pattern

MongoDB Atlas

API Testing

Thunder Client

---

# Commands

Install

```bash
npm install
```

Run

```bash
npm run dev
```

Show Installed Libraries

```bash
npm list --depth=0
```

---

# Next Module

Products CRUD

↓

Categories

↓

Cloudinary

↓

Admin Dashboard

↓

Cart

↓

Wishlist

↓

Orders

↓

Deployment
