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

## Requirements

### Scope
- Secure authentication (Sign Up / Sign In)
- Role-based access (Admin/HR vs Employee)
- Employee profile management
- Attendance tracking (daily/weekly/monthly)
- Leave and time-off management with approvals
- Payroll visibility and admin controls

### Functional
- **Auth**: Register with employeeId/email/password/role; email verification; strong password policy; login with error handling; JWT + refresh tokens; password reset; rate limiting and lockout after repeated failures.
- **Roles**: Employee vs Admin/HR (future Manager). Employees see only their data; Admin/HR full CRUD and approvals.
- **Dashboards**: Employee quick cards (Profile, Attendance, Leave, Payroll, Logout) with recent activity; Admin/HR widgets for pending leaves, attendance exceptions, employee list, payroll status.
- **Profiles**: View personal/job/payroll/document data; employees edit contact/address/avatar; Admin/HR edit all; audit changes.
- **Attendance**: Check-in/out, auto status (Present/Half-day/Absent/Leave), views with filters, admin overrides with reason and audit; holidays/weekends support.
- **Leave**: Configurable types (Paid/Sick/Unpaid/Optional); balance checks; overlap validation; workflow Pending → Approved/Rejected with comments; cancellation rules; notifications on submit/approve/reject.
- **Payroll**: Employee read-only payslip (period, gross, deductions, net, components); Admin/HR create/update, attach payslip, lock after release; audit edits.
- **Approvals**: Admin/HR (optional manager tier), SLA targets and reminders for pending approvals.
- **Documents**: Upload/download with type/size validation; metadata; soft-delete with retention.
- **Search/Filters**: Global employee search; filters on attendance/leave/payroll by date/status/department.
- **Notifications**: Email for verification, password reset, leave status; optional in-app toasts/badges.

### Non-Functional
- **Security**: HTTPS, JWT, bcrypt hashing, input validation/sanitization, restricted CORS, rate limiting.
- **Availability**: ~99.5% uptime goal; graceful shutdown; health check `/health`.
- **Performance**: P99 < 800ms for core APIs; pagination on lists.
- **Scalability**: Stateless API, horizontal-ready; external file/object storage for documents.
- **Reliability**: Daily backups; point-in-time restore; audit trails on critical changes.
- **Maintainability**: Lint/format; env-driven config; feature flags.
- **Observability**: Structured logs (request id, user id), error tracking, metrics (requests, latency, errors).

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
