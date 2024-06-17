Poll System Web Application
This is a Poll System web application built using the MERN stack (MySQL, Express, React, Node.js). The application allows users to register, login, create polls (institutes only), and participate in polling (teachers or students based on the institute's selection). The application includes authentication and CRUD operations for user data.

Features
User Registration and Login
Role-based access control (Institute, Teacher, Student)
CRUD operations on user data
Poll creation and participation
Authentication with JWT
Responsive design with Bootstrap
Technologies Used
Frontend
React
Bootstrap
React Router Dom
Axios
Backend
Node.js
Express
MySQL
Bcrypt
JSON Web Token (JWT)
Cookie Parser
Setup Instructions
Prerequisites
Node.js
MySQL
npm or yarn
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/aadityakasaudhan/poll-system.git
cd poll-system/backend
Install backend dependencies:

bash
Copy code
npm install
Set up your MySQL database. Create a database called poll_system and configure your MySQL connection in the backend/config/db.config.js file.

Start the backend server:

bash
Copy code
npm start
Frontend Setup
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Start the frontend development server:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000 to view the application.
