# Spill the Beans - Seattle Coffee Shop Reviewing Web App

Welcome to Spill the Beans, the ultimate platform to help you find your ideal coffee shop in Seattle! Whether you're looking for the perfect study spot, a comfortable workspace, or just a cozy place to enjoy a cup of coffee, Spill the Beans has got you covered.

## Visit Our Website

Check out the live site deployed on Vercel: [Spill the Beans](https://spill-the-beans-hazel.vercel.app/)

## About Spill the Beans
### What the App Does
Spill the Beans provides detailed, multi-category reviews of coffee shops in Seattle, helping users find the perfect spot based on their specific preferences. Unlike other review platforms, our app allows users to leave and read reviews in various categories, providing a comprehensive understanding of each coffee shop.

**Key Features:**
- **Granular Ratings**: Rate and review coffee shops based on seating availability, food and coffee quality, charging outlet availability, and noise level.
- **Personalized Search**: Filter and search for coffee shops based on neighborhood and specific preferences.
- **User Profiles**: Create a profile to track your reviews of coffee shops.
- **Community Engagement**: Engage with the community by leaving detailed feedback of your experiences.

## Tech Stack
Spill the Beans is a full-stack MERN (MongoDB, Express, React, Node.js) application.
### Backend
The backend is powered by Node.js with the following dependencies:
- `bcryptjs`: For password hashing.
- `cors`: To enable Cross-Origin Resource Sharing.
- `dotenv`: For environment variable management.
- `express`: For creating the server and handling routes.
- `jsonwebtoken`: For handling JSON Web Tokens for authentication.
- `mongodb`: For the database.
- `mongoose`: For object data modeling (ODM).

### Frontend
The frontend is built using React and includes the following dependencies:
- `axios`: For making HTTP requests.
- `react`: The core library for building the user interface.
- `react-cookie`: For managing cookies.
- `react-dom`: For working with the DOM.
- `react-hot-toast`: For displaying toast notifications.
- `react-router-dom`: For handling routing.
- `react-scripts`: For running the development server and build scripts.

### Context API
The app uses Context API for state management to efficiently handle and share data across components.
