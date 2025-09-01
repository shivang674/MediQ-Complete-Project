# **MediQ \- Your Health, Simplified.**

Welcome to the official repository for MediQ\! This is a full-stack MERN application designed to streamline the process of ordering diagnostic tests. Think of it as a "Zomato for medical tests"—a platform that helps patients easily order tests by simply uploading a doctor's prescription.

This project was built from the ground up, featuring a modern, responsive frontend built with React and a robust, secure backend powered by Node.js and Express.

## **✨ Key Features**

* **Full User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens) for session management.  
* **Secure Prescription Uploads:** Users can upload their prescriptions (PDF, JPG, PNG) directly to a secure cloud storage service (Cloudinary).  
* **Dynamic Order Management:** Create and view a complete history of all placed orders.  
* **Report Access:** A dedicated section for users to view and access their completed reports.  
* **Persistent Login:** The application remembers your session, so you don't have to log in every time you visit.  
* **Interactive UI:** A beautiful, modern interface with dynamic animations and effects to enhance the user experience.  
* **Newsletter Subscription:** A feature to capture user emails for future updates.

## **🛠️ Tech Stack**

This project is built on the MERN stack with a few other modern technologies.

| Frontend | Backend | Database | File Storage |
| :---- | :---- | :---- | :---- |
| **React.js** | **Node.js** | **MongoDB** (with Mongoose) | **Cloudinary** |
| **React Router** for navigation | **Express.js** for the server framework |  | **Multer** for handling uploads |
| **Tailwind CSS** for styling | **JWT** for authentication |  |  |
| **Axios** for API requests | **Bcrypt.js** for password hashing |  |  |
| **Vite** for the build tool |  |  |  |

## **🚀 Getting Started**

To get a local copy of this project up and running, follow these simple steps.

### **Prerequisites**

* **Node.js** (v18 or later is recommended)  
* **npm** (comes with Node.js)  
* A free **MongoDB Atlas** account for the database.  
* A free **Cloudinary** account for file storage.

### **Installation & Setup**

1. **Clone the repository** to your local machine:  
   git clone \[https://github.com/YourUsername/mediq-fullstack-app.git\](https://github.com/YourUsername/mediq-fullstack-app.git)  
   cd mediq-fullstack-app

2. **Backend Setup:**  
   * Navigate into the backend directory:  
     cd backend

   * Install the necessary npm packages:  
     npm install

   * Create a new file named .env in the backend folder. This is where you'll store your secret keys. Copy the contents of the .env.example below into it.  
   * Start the backend server:  
     node server.js

   * Your backend should now be running on http://localhost:5000.  
3. **Frontend Setup:**  
   * Open a **new terminal** and navigate into the frontend directory:  
     cd mediq-frontend

   * Install the necessary npm packages:  
     npm install

   * Start the frontend development server:  
     npm run dev

   * Your frontend should now be running on http://localhost:5173 (or another port if 5173 is busy).

### **Environment Variables**

You must create a .env file in the backend directory and add the following variables. Do not commit this file to GitHub.

\# MongoDB Connection String (get this from your Atlas dashboard)  
MONGO\_URI="your\_mongodb\_connection\_string"

\# JWT Secret (generate a long, random string)  
JWT\_SECRET="your\_super\_secret\_jwt\_key"

\# Cloudinary Credentials (get these from your Cloudinary dashboard)  
CLOUDINARY\_CLOUD\_NAME="your\_cloud\_name"  
CLOUDINARY\_API\_KEY="your\_api\_key"  
CLOUDINARY\_API\_SECRET="your\_api\_secret"

## **📖 API Endpoints**

The backend provides the following RESTful API endpoints:

| Method | Endpoint | Description | Access |
| :---- | :---- | :---- | :---- |
| POST | /api/users/register | Register a new user. | Public |
| POST | /api/users/login | Log in a user and get a token. | Public |
| GET | /api/users/profile | Get the logged-in user's profile. | Private |
| POST | /api/orders | Create a new order with a file. | Private |
| GET | /api/orders | Get all orders for the user. | Private |
| POST | /api/subscribe | Subscribe to the newsletter. | Public |

## **🔮 Future Features**

* **Search & Discovery:** Allow users to search for specific tests and see which diagnostic centers offer them.  
* **Lab Profiles:** Create detailed profile pages for different diagnostic labs.  
* **Ratings & Reviews:** Implement a system for users to rate and review centers.  
* **Online Booking:** Allow users to book appointments directly through the app.

Thanks for checking out the project\!