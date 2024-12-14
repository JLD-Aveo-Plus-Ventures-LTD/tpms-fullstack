# **Ticket Payment Management System (TPMS)**

## **Overview**

This project is a full-stack application designed for ticket payment management. It consists of a **client-side React** application and a **server-side Node.js** application.

## **Project Structure**

- **client/**: React frontend
- **server/**: Node.js backend with Express
- **.gitignore**: Specifies files and folders that should be ignored by Git

## **Prerequisites**

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Git](https://git-scm.com/)

## **Setup Instructions**

### 1. **Clone the Repository**

Clone the project to your local machine:

```bash
git clone https://github.com/JLD-Aveo-Plus-Ventures-LTD/tpms-fullstack.git
cd tpms-fullstack
```

### 2. **Setting Up the Backend (Server)**

#### 2.1 Install Backend Dependencies

Navigate to the `server` folder and install the dependencies:

```bash
cd server
npm install
```

#### 2.2 Configure Database

- Ensure you have your database set up (using a database like PostgreSQL, MongoDB, etc.).
- Update the `server/config/db.js` file with your database connection details.

#### 2.3 Run the Backend

Start the backend server:

```bash
npm start
```

This will start your backend API on the configured port (usually `http://localhost:5000`).

### 3. **Setting Up the Frontend (Client)**

#### 3.1 Install Frontend Dependencies

Navigate to the `client` folder and install the dependencies:

```bash
cd ../client
npm install
```

#### 3.2 Run the Frontend

Start the frontend React application:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

### 4. **Testing the Application**

After running both the backend and frontend, you can visit `http://localhost:3000` to interact with the application.

## **Contributing**

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## **License**

This project is licensed under the MIT License.

---

## **Backend Integration Notes**

**Date:** December 14th, 2024  
**To:** Muhammad

Hi Muhammad,

The frontend implementation for the `LoginPage` has been completed. Below are the key expectations and integration notes for the backend:

The frontend implementation for the `LoginPage` has been completed. Below are the key expectations and integration notes for the backend:

**Login Endpoint:** The frontend sends a `POST` request to the `/api/login` endpoint. The request format is as follows:

{
"email": "user@example.com",
"password": "userpassword"
}

The backend should respond with either a success or error response. A success response should look like this:
{
"success": true,
"role": "cashier", // or "operator"
"token": "JWT-TOKEN-HERE" // optional, if tokens are used
}

An error response should look like this:
{
"success": false,
"message": "Invalid credentials" // or a relevant error message
}

The backend should include a role field in the response to allow the frontend to handle redirection appropriately. "cashier" should redirect to /CashierDashboard, and "operator" should redirect to /OperatorDashboard. If no role or an unexpected role is received, the frontend will display: "Unexpected role received. Please contact support."

Validation Responsibility: The frontend performs basic validation (e.g., checking for empty fields), while the backend is responsible for validating whether the email exists in the database and whether the password matches the stored hash. The backend should return appropriate error messages for invalid credentials.

Error Handling: Please use appropriate HTTP status codes: 200 for success, 400 for validation errors, 401 for unauthorized access, and 500 for server-side errors. Include a message field in error responses for meaningful feedback.

Security: Passwords should never be logged or stored in plaintext. If using tokens (e.g., JWTs), specify whether the token will be returned in the response or set as an HTTP-only cookie. Clarify how the frontend should store or use the token for future requests.

Testing Notes: You can test the LoginPage integration by sending valid and invalid credentials to /api/login and verifying the role-based redirection logic by modifying the role field in the response.

Let me know if you have any questions or need any adjustments on the frontend to support the backend implementation!

Best regards,
Dare
