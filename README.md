# Employee Timesheet Management System - Backend

## Overview
This is the backend service for the **Employee Timesheet Management System**, a role-based application designed to manage employee timesheets efficiently. The backend is built with **Node.js** and **Express**, using **MongoDB** as the database and **JWT** for secure authentication.

---

## Features
- **User Authentication**: Register and login using JWT-based authentication.
- **Role-Based Access Control**: Admin, Manager, and Employee roles with distinct permissions.
- **Timesheet Management**:
  - Employees can submit and view their timesheets.
  - Managers can view, approve, or reject timesheets for their department.
  - Admins can view all timesheets.
- **User Management**: Admins can view all users.

---

## Prerequisites
- **Node.js** (v16+)
- **MongoDB**

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-link>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the Server
```bash
npm start
```
The backend will run on `http://localhost:5000` by default.

---

## API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user (Admin only).
- **POST /api/auth/login**: Authenticate a user and generate a JWT token.

### Timesheets
- **POST /api/timesheets**: Submit a timesheet (Employee only).
- **GET /api/timesheets/mine**: Get the logged-in employee's timesheets.
- **GET /api/timesheets**: Get all timesheets (Admin/Manager only).
- **PUT /api/timesheets/:id**: Approve or reject a timesheet (Manager only).

### Users
- **GET /api/users**: Get all users (Admin only).

---

## Demo Credentials

Use the following demo accounts to test the application:

### Admin
- **Email**: admin@example.com
- **Password**: 12345678

### Manager
- **Email**: manager@example.com
- **Password**: 12345678

### Employee
- **Email**: employee@example.com
- **Password**: 12345678

---

## Environment Variables
Ensure the following environment variables are set for the backend to work properly:

- **PORT**: The port number for the server (default: 5000).
- **MONGO_URI**: The connection string for MongoDB.
- **JWT_SECRET**: A secret key for signing JWT tokens.