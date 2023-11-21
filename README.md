# Wizard-Creatures-SoftUni-Workshop
Welcome to the Wizard Creatures Workshop project! This project is a Harry Potter-themed web application where users can explore magical creatures, create posts, and interact with the magical world. Below, you'll find an overview of the features and the technologies used in the project.

Technologies
This project is built using the following technologies:

- Express: Web application framework for Node.js.
- Express Handlebars: Handlebars view engine for Express.
- Mongoose: MongoDB object modeling for Node.js.
- Jsonwebtoken: JSON Web Token implementation for authentication.
- Cookie-parser: Middleware for handling cookies in Express.
- Bcrypt: Library for hashing passwords.


## Features

### Authentication

- **User Registration:** Guests can register for an account.
- **User Login/Logout:** Registered users can log in and log out securely.

### Access Control

- **Guest Access:** Guests can view the home page, all posts, register, and log in.
- **User Access:** Logged-in users can create new posts about magical creatures.

### Post Management

- **Create Posts:** Logged-in users can create new posts about magical creatures.
- **Edit/Delete Posts:** Owners of a post can edit or delete their posts.
- **View Post Details:** Everyone can view detailed information about a post.

### Voting System

- **Vote for Posts:** Logged-in users (non-owners) can vote for a post, increasing its vote count.
- **Display Votes:** The number of votes is displayed, along with the list of users who voted.

### User Profile

- **View Profile:** Logged-in users can view their user profile.
- **View Own Posts:** Users with posts can see only their own posts on their profile.
- **View Post Details on Profile:** Users can view details about their own posts on their profile.

Usage
- Register for an account if you are a new user.
- Log in to access additional features.
- Explore magical creatures on the home page and view all posts.
- Create new posts about magical creatures if you are logged in.
- Edit or delete your posts if you are the owner.
- View detailed information about each post.
- Vote for posts to show appreciation.
- View your user profile to see your posts and details.
