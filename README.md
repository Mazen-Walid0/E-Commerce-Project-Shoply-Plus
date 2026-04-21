# Shoply Plus — E-Commerce Web App

A fully responsive, scalable front-end e-commerce application inspired by platforms like Amazon and Noon.
Built with React, Redux Toolkit, and a clean component-based architecture focused on performance and user experience.

🔗 **Live Demo:** [silly-meringue-55a614.netlify.app](https://silly-meringue-55a614.netlify.app/)

---

## Overview

Shoply Plus is a front-end e-commerce project that allows users to browse products, search by keyword, filter by category, manage a shopping cart, and save favorite items.

Product data is fetched from the [DummyJSON API](https://dummyjson.com/) using Axios.
Authentication, cart, and favorites are persisted via **Redux Toolkit** and **localStorage**.

---

## Features

- 🔍 Product search with real-time filtering
- 🛍 Add / remove items from cart with quantity control
- ❤️ Add / remove items from favorites
- 👤 Login & Register system (localStorage-based)
- 🗂 Browse and filter products by category
- 📄 Category details page with pagination
- ⚡ Fully responsive design across all screen sizes
- 🔄 Global state management using Redux Toolkit

---

## Tech Stack

| Category           | Technology                    |
|--------------------|-------------------------------|
| Framework          | React 18 (Vite)               |
| State Management   | Redux Toolkit                 |
| Routing            | React Router DOM              |
| HTTP Client        | Axios                         |
| Styling            | Tailwind CSS, Sass (SCSS)     |
| UI Utilities       | React Icons, React Hot Toast  |
| API                | DummyJSON API                 |
| Deployment         | Netlify                       |

---

## State Management

Redux Toolkit manages the following slices:

- **cartSlice** — add, remove, update quantity, persist to localStorage
- **favoritesSlice** — add / remove favorites, persist to localStorage
- **productsSlice** — global product data and loading state

---

## Project Structure

```
src/
├── components/       # Reusable UI components (NavBar, ProductCard, Pagination...)
├── pages/            # Route-level pages (Home, Category, ProductDetails, Cart...)
├── store/            # Redux store and slices (cartSlice, favoritesSlice, productsSlice)
├── hooks/            # Custom React hooks
├── styles/           # Global SCSS files
└── main.jsx          # App entry point
```

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Mazen-Walid0/E-Commerce-Project-Shoply-Plus.git

# Navigate into the project directory
cd E-Commerce-Project-Shoply-Plus

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Author

**Mazen Walid** — Front-End Developer
- Email: mazenwalid385@gmail.com
