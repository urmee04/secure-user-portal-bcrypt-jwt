### Lab 14.1: Basic Login System

A basic Express.js authentication system for Innovate Inc.'s user portal, providing user registration and login functionality with JWT-based authentication.

---

#### Features

- User Registration: Create new user accounts with securely hashed passwords
- User Login: Authenticate users and issue JSON Web Tokens (JWT)
- Password Security: Uses bcrypt for password hashing (salt rounds: 10)
- Input Validation: Basic validation for email format and password length
- Error Handling: Comprehensive error handling for various scenarios

---

#### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- bcrypt
- jsonwebtoken
- dotenv
- postman

---
#### Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/urmee04/secure-user-portal-bcrypt-jwt.git
```

   `cd secure-user-portal`

2. Install dependencies:

   `npm install`

3. Set up environment variables:

   - Create a .env file in the root directory

   `MONGO_URI=<your-connection-string-here>`
   `PORT=3000`
   `JWT_SECRET=<your-super-secret-key-here>`

4. Start the server:

   `npm start`

5. Use Postman to test:

- **Register**

`POST http://localhost:3000/api/users/register`
`Content-Type: application/json`
```bash
{
  "username": "name",
  "email": "name@example.com",
  "password": "mypassword123"
}
```

- **Login**

`POST http://localhost:5000/api/users/login`
`Content-Type: application/json`
```bash
{
  "email": "name@example.com",
  "password": "mypassword123"
}
```
---

#### Project Structure

```bash
secure-user-portal/

├── models/ # mongoose models will go here
│ └── User.js
│
├── routes/ # express route handlers will go here
│ └── userRoutes.js
│
├── server.js # entry point of the app
├── .env # environment variables (MongoDB URI, PORT, etc.)
├── .gitignore # ignore node_modules and .env
├── package.json
└── package-lock.json
```
---
#### References

My primary resource for completing the lab was the code from our class lessons and materials. Additionally, I used the resources mentioned below to deepen my understanding of the concepts and code flow

- [JasonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.geeksforgeeks.org/node-js/npm-bcrypt/)
- [mongoDB Bootcamp](https://generalmotors.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065064#overview)



