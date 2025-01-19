Social Media App

A simple social media application built using Next.js, Node.js, Express, and MySQL. This app allows users to:

Register and log in using email and password

Create, view, and like/dislike posts

Follow and unfollow other users

Features

Backend

RESTful API built with Node.js and Express

User authentication using JWT

MySQL database integration without ORM

APIs for:

User registration and login

Creating posts

Liking/disliking posts

Following/unfollowing users

Frontend

Built using Next.js

Form handling with Formik and validation with Yup

UI components styled with Material-UI

Functionalities include:

User signup and login

Viewing posts feed

Interacting with posts (like/dislike)

Following/unfollowing other users

Installation and Setup

Prerequisites

Node.js (v14 or later)

MySQL

Backend Setup

Clone the repository:

git clone https://github.com/your-username/repository-name.git
cd repository-name/backend

Install dependencies:

npm install

Set up the database:

Create a MySQL database named social_media.

Run the following SQL commands to create the necessary tables:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (followed_id) REFERENCES users(id)
);

Start the server:

node server.js

The backend server will be running at http://localhost:3001.

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Open your browser and go to http://localhost:3000 to access the application.

Usage

Signup:

Navigate to the signup page and create a new account.

Login:

Use your email and password to log in.

Create Posts:

Once logged in, create new posts from the home page.

Like/Dislike Posts:

Interact with posts by liking or disliking them.

Follow/Unfollow Users:

Follow or unfollow other users from their profiles.

Technologies Used

Backend

Node.js

Express

MySQL

JWT for authentication

Frontend

Next.js

Material-UI

Formik & Yup

License

This project is licensed under the MIT License.

Acknowledgments

Special thanks to the contributors and the open-source community for providing amazing tools and libraries.
