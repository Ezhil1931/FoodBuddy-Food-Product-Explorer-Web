# FoodLens — Food Product Explorer

FoodLens is a responsive web application that allows users to search and explore packaged food products using **local product data**.

Users can search for food products and view detailed information such as product images, ingredients, nutrition facts, allergens, categories, brands, and more.

## 🚀 Features

* 🔍 Search food products by name or keyword
* 📦 Display packaged food product information
* 🖼️ Show product images
* 🏷️ Display product name and brand
* 🥗 View ingredients
* 📊 View nutrition information
* 🔥 Display calories, protein, carbohydrates, fat, sugar, salt, and other nutrients
* ⚠️ Display allergen information
* 🌱 Display vegetarian/vegan information when available
* 📂 Display product categories
* 📱 Responsive design for desktop, tablet, and mobile
* ⚡ Fast and simple user interface
* 💾 Uses local product data instead of an external API

## 🛠️ Technologies Used

* **React.js** — Frontend framework
* **Tailwind CSS** — Styling and responsive UI
* **JavaScript** — Application logic
* **HTML5 & CSS3** — Web structure and styling
* **Local JSON/Data** — Product information

## 💾 Data Source

FoodLens uses a **local product dataset** stored inside the project.

The application does not make API requests to retrieve product information. Product data such as names, brands, images, ingredients, and nutrition values are stored locally and loaded by the React application.

Example:

```text
src/
├── data/
│   └── products.json
│
├── components/
│   ├── SearchBar.jsx
│   ├── ProductCard.jsx
│   ├── ProductDetails.jsx
│   └── NutritionInfo.jsx
│
├── pages/
│   ├── Home.jsx
│   └── Product.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## 🔄 How It Works

```text
User searches for a food
        ↓
React application
        ↓
Local product data
        ↓
Search/filter products
        ↓
Product information displayed
```

## 📋 Product Information

Depending on the available data, FoodLens can display:

* Product name
* Brand
* Product image
* Barcode
* Ingredients
* Nutrition facts
* Calories
* Protein
* Carbohydrates
* Fat
* Sugar
* Salt / sodium
* Serving size
* Categories
* Allergens
* Dietary information
* Packaging information
* Country of origin

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the project

```bash
cd foodbuddy
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available through the local development URL shown in your terminal.

## 📁 Project Structure

```text
src/
├── components/
│   ├── SearchBar.jsx
│   ├── ProductCard.jsx
│   ├── ProductDetails.jsx
│   └── NutritionInfo.jsx
│
├── data/
│   └── products.json
│
├── pages/
│   ├── Home.jsx
│   └── Product.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## 🎯 Project Purpose

This project was created as a portfolio project to demonstrate practical frontend development skills, including:

* Working with local JSON data
* Building reusable React components
* Managing application state
* Creating responsive layouts
* Designing user-friendly interfaces
* Implementing search and filtering
* Handling missing or incomplete product data
* Displaying dynamic product information

## 📱 Responsive Design

FoodLens is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

## 📦 Local Product Dataset

The product information is stored locally inside the project.

This approach makes the application:

* ⚡ Fast
* 🌐 Independent of an external API
* 📴 Usable without API connectivity
* 🎨 Easy to customize
* 🔧 Easy to modify and extend

New products can be added by updating the local product dataset.

## ⚠️ Disclaimer

FoodBuddy is a portfolio project using locally stored product information. Product information is provided for demonstration purposes and may not represent the actual specifications of commercial products.

## 👨‍💻 Author

**Your Name**

Built with ❤️ using React.js, Tailwind CSS, and local product data.
