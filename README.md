
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
