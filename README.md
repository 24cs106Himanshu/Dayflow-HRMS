# Dayflow HRMS

A Human Resource Management System built with React and Node.js.

## Overview
Dayflow HRMS is a comprehensive Human Resource Management System designed to streamline HR operations including employee management, attendance tracking, leave management, and payroll processing.

## Features
- **User Authentication**: Secure login with JWT tokens
- **Employee Management**: View and update employee profiles
- **Attendance Tracking**: Record and monitor employee attendance
- **Leave Management**: Request and approve leave applications
- **Payroll**: Calculate and manage employee salaries
- **Role-Based Access**: Different features for Admin and Employee roles

## Project Structure
```
Dayflow-HRMS/
├── client/        (React frontend)
├── server/        (Node.js + Express backend)
├── docs/          (Documentation including SRS.pdf)
├── README.md
└── .env.example
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Create `.env` file with MongoDB URI and JWT secret
4. Start the server: `npm start`

### Frontend Setup
1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Employees
- `GET /api/employees/profile` - Get user profile
- `PUT /api/employees/profile` - Update user profile

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Add attendance record

### Leave
- `GET /api/leave` - Get leave requests
- `POST /api/leave` - Apply for leave
- `PUT /api/leave/:id` - Approve/Reject leave (Admin only)

### Payroll
- `GET /api/payroll` - Get payroll records
- `POST /api/payroll` - Add payroll (Admin only)

## Environment Variables
See `.env.example` for required environment variables.

## Documentation
For detailed requirements and specifications, see [docs/SRS.pdf](docs/SRS.pdf).

## License
ISC

## Author
Himanshu - 24cs106
