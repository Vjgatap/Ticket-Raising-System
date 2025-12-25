# Ticket-Raising-System
Complaint / Ticket Raising System

---

# Complaint / Ticket Raising System

**(MERN Stack Full-Stack Project)**

---

## Project Overview

The **Complaint / Ticket Raising System** is a full-stack web application designed to allow users (employees/customers) to **raise complaints or service requests**, and enable admins/support teams to **track, assign, and resolve tickets efficiently**.

This project simulates **real-world IT support and helpdesk systems** like ServiceNow, SMAX, or Jira Service Management.

---

## Project Objectives

* Provide a structured way to raise and manage complaints
* Implement role-based authentication (User & Admin)
* Track ticket lifecycle from creation to closure
* Give interns hands-on experience with **real-world MERN stack development**

---

## Technologies Used

### 🔹 Frontend

* **React.js** – UI development
* **HTML5 / CSS3**
* **JavaScript (ES6+)**
* **Axios** – API communication
* **React Router DOM** – Routing
* **Tailwind CSS / Bootstrap** (optional) – Styling

---

### 🔹 Backend

* **Node.js** – Runtime environment
* **Express.js** – Backend framework
* **JWT (JSON Web Token)** – Authentication
* **bcrypt.js** – Password hashing
* **CORS** – Cross-origin requests

---

### 🔹 Database

* **MongoDB** – NoSQL database
* **Mongoose** – ODM (Object Data Modeling)

---

### 🔹 Tools & Platforms

* **Git & GitHub** – Version control
* **Postman** – API testing
* **Vercel** – Frontend deployment
* **Render / Railway** – Backend deployment

---

## User Roles

### User

* Register & Login
* Raise a complaint (ticket)
* View ticket status
* Track own tickets

### Admin

* Login securely
* View all tickets
* Assign tickets
* Update ticket status
* Close resolved tickets

---

## Ticket Lifecycle

1. **Open** – Ticket created
2. **In Progress** – Assigned to support
3. **Resolved** – Issue fixed
4. **Closed** – Ticket completed

---

##  Frontend UI Overview

### 🔹 Pages / Components

* Login Page
* Register Page
* User Dashboard
* Raise Ticket Form
* Ticket List Page
* Admin Dashboard
* Ticket Management Page

---

### 🔹 UI Flow

```
Login → Dashboard → Raise Ticket → Track Status
Admin → View Tickets → Assign → Update Status
```

---

## Backend Architecture

### 🔹 Folder Structure

```
backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── server.js
```

---

### 🔹 API Architecture

* RESTful APIs
* MVC Pattern
* Role-based access using middleware

---

## 🗃️ Database Schema

### 🔹 User Schema

```js
{
  name: String,
  email: String,
  password: String,
  role: "user | admin",
  createdAt: Date
}
```

---

### 🔹 Ticket Schema

```js
{
  title: String,
  description: String,
  category: String,
  priority: "Low | Medium | High",
  status: "Open | In Progress | Resolved | Closed",
  createdBy: ObjectId,
  assignedTo: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

---

### 🎫 Ticket APIs

* `POST /api/tickets` – Create ticket
* `GET /api/tickets/my` – User tickets
* `GET /api/tickets` – Admin (all tickets)
* `PUT /api/tickets/:id` – Update status
* `DELETE /api/tickets/:id` – Admin delete

---

## Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes using middleware
* Role-based access control

---

##  Intern Task Allocation

| Intern   | Responsibility                    |
| -------- | --------------------------------- |
| Intern 1 | Authentication & JWT              |
| Intern 2 | Ticket APIs & Database            |
| Intern 3 | Frontend UI                       |
| Intern 4 | Integration, Testing & Deployment |

---

##  Future Enhancements

* Email notifications
* File upload support
* Ticket comments
* SLA & escalation system
* Admin analytics dashboard

---



