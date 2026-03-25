# 🎱 Beloved Billiard Hall — Web Application

A full-featured web application for managing a billiard hall business. This system includes a **public-facing website for customers** and a **secure admin dashboard** for managing operations such as bookings, revenue, and user accounts.

---

## 🌐 Overview

**Beloved Billiard Hall** is designed to streamline table reservations and business management.

### 👥 Two Main Interfaces:

* **Public Website (Customers)**
* **Admin Dashboard (Staff & Admins)**

---

## 🚀 Features

### 🎯 Public Website

* View billiard hall information (about, rates, gallery, schedule, location)
* Book a table online
* Submit booking requests
* Responsive and user-friendly UI

---

### 🔐 Admin Dashboard (Authentication Required)

* Secure login system
* Role-based access (Admin)

#### 📊 Dashboard

* Overview of bookings
* Daily revenue summary
* Activity monitoring

#### 📅 Booking Management

* View all booking requests
* Accept / reject bookings

#### 💰 Revenue Reports

* Daily & monthly reports
* Earnings analytics
* Transaction history

#### 👤 Account Management

* Approve new admin/staff accounts
* Deactivate accounts

#### ⚙️ Website Settings

* Update business info (rates, tables, location, hours, contact)

---

## 🛠️ Tech Stack

* **Frontend:** HTML / CSS / JavaScript
* **Backend (BaaS):** Firebase

  * Firestore (Database)
  * Authentication (Admin login)
  * Hosting (Deployment)

---

## 🧱 System Architecture

```text
Customer → Public Website (Firebase Hosting)
              ↓
         Firebase SDK
       ↙             ↘
 Authentication  Firestore  

Admin → Dashboard (Protected Routes)
```

---

## 📂 Project Structure

```text
beloved-billiard-hall/
│
├── public/                # Public website (customer side)
│   ├── index.html
│   ├── booking.html
│   ├── assets/
│   └── admin/
│       ├── index.html
│       └── admin.html
│
├── firebase.json
├── firestore.rules
├── .firebaserc
└── package.json
```

---

## 🔥 Firebase Setup

### 1. Create a Firebase Project
* Go to Firebase Console
* Click "Add Project"
* Complete setup

### 2. Register Web App
* Click "</> Add App"
* Copy your Firebase config

const firebaseConfig = {
  apiKey: "YOUROWNAPIKEY",
  authDomain: "YOUROWNAUTHDOMAIN",
  projectId: "YOUROWNPROJECTID",
  storageBucket: "YOUROWNSTORAGEBUCKET",
  messagingSenderId: "YOUROWNMESSAGINGSENDERID",
  appId: "YOUROWNAPPID"
};

### 3. Install firebase

```bash
npm install firebase
```

### 4. Authentication Setup
Enable in Firebase Console:
* Go to Authentication → Sign-in Method
* Enable Email/Password

### 5. Firebase Hosting

```bash
npm install -g firebase-tools
```
```bash
firebase login
```
```bash
firebase init
```

Select:

* Hosting
* Firestore
* Authentication

---

### 6. Firestore Collections (Suggested)

```text
users/
  └── {userId}
        - createdAt
        - email
        - name
        - role

bookings/
  └── {bookingId}
        - createdAt
        - date
        - end
        - price
        - start
        - status
        - table
        - userName

settings/
  └── website
        - about
        - contact
        - hours
        - location
        - price
        - tables
```

---

## 🔐 Authentication Flow

* Admin logs in via Firebase Authentication
* Only approved users can access dashboard
* Use Firestore to store roles

```js
if (userData.role === "admin") {
  // allow access
} else {
  // deny access
}
```

---

## 🔒 Security Rules (Example)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /settings/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /bookings/{doc} {
      allow read, write;
    }

    match /users/{userId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 🌐 Deployment

```bash
firebase deploy
```

* Public site → `https://billiard-9b764.web.app/`
* Admin dashboard → `https://billiard-9b764.web.app/admin`

---

## 🧪 Future Improvements

* 📱 Mobile optimization
* 📊 Advanced analytics dashboard
* 🔔 Email/SMS notifications for bookings
* 💳 Online payment integration

---

## 🧑‍💻 Author

Beloved Billiard Hall Development Team
* GARCIA, Roshan Alfonso
* MANGAHAS, Romualdo Jr. N.
* VISITACION, Maquee Reinhart P.

---

## 📄 License

MIT License
