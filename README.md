
# Blog Website

A full-stack blog website built using MERN (MongoDB, Express, React, Node.js) with a separate client and server architecture. This application allows users to create, read, update, and delete blog posts and supports user authentication.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)

## Features
- User authentication with JWT
- Create, edit, and delete blog posts
- View a list of blogs and read individual blog posts
- Responsive design using Tailwind CSS

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/aditya-singh-99/Blog-Website.git
    cd Blog-Website
    ```

2. **Install dependencies:**
   - Install server dependencies:
     ```bash
     cd server
     npm install
     ```
   - Install client dependencies:
     ```bash
     cd ../client
     npm install
     ```

3. **Start the application:**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend React application (ensure it's running on a different port):
     ```bash
     cd ../client
     npm start
     ```

4. **Access the application:**
   - Visit `http://localhost:3000` for the frontend.
   - The backend API is hardcoded to be accessed at `http://localhost:4000`.

### Important Note
- The React application uses the hardcoded API endpoint `http://localhost:4000` for all API requests. Ensure the backend server is running on port 4000 for the frontend to function properly.


## Folder Structure
```plaintext
Blog-Website/
├── client/          # Frontend code (React, Tailwind CSS)
│   ├── public/      
│   └── src/         
├── server/          # Backend code (Node.js, Express)
│   ├── models/      
│   ├── routes/      
│   └── controllers/ 
└── README.md
```

## API Endpoints

### User Authentication
- **POST** `/login`  
  Logs in a user and returns a JWT token.

- **POST** `/signup`  
  Creates a new user account.

### File Upload
- **POST** `/file/upload`  
  Uploads a file.

- **GET** `/file/:filename`  
  Retrieves a file by its filename.

### Blog Posts
- **POST** `/create`  
  Creates a new blog post (requires authentication).

- **GET** `/posts`  
  Retrieves all blog posts (requires authentication).

- **GET** `/post/:id`  
  Retrieves a single blog post by ID (requires authentication).

- **PUT** `/update/:id`  
  Updates a blog post by ID (requires authentication).

- **DELETE** `/delete/:id`  
  Deletes a blog post by ID (requires authentication).

### Comments
- **POST** `/comment/new`  
  Adds a new comment to a blog post (requires authentication).

- **GET** `/comments/:id`  
  Retrieves all comments for a blog post by ID (requires authentication).

- **DELETE** `/comment/delete/:id`  
  Deletes a comment by ID (requires authentication).
