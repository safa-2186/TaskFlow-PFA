# TaskFlow

A task management web application, lets users organize their work on a kanban board with three stages : To Do, In Progress, and Done. Each user has their own account, protected by authentication, and can create,assign,and track tasks while the app logs their activity history automatically.

## Features

Authentication is handled through user registration and login, with passwords hashed before storage and sessions managed using JWT tokens. Every user only sees their own tasks, since each request is verified against their token.

The task board supports creating,editing,and deleting tasks, along with drag and drop between columns. Tasks can be assigned to team members,given a priority level,and tracked with a due date.

The dashboard summarizes open,in progress,and completed tasks, shows a weekly activity chart,and keeps a running history log of recent actions such as task creation, completion,and deletion.


## Tech stack

The frontend is built with HTML,CSS,and JavaScript.The backend runs on Node.js with Express, connected to a MySQL database.Authentication uses bcryptjs for passwordhashing and jsonwebtoken for session tokens.


## Project structure

```bash
TaskFlow-PFA/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── tasks.js
│   ├── db.js
│   ├── server.js
│   └── .env
└── frontend/
    └── index.html
```


## Database schema


```sql
CREATE DATABASE taskflow;
USE taskflow;
 
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
  user_id INT,
  assignee VARCHAR(100) DEFAULT 'No one',
  priority VARCHAR(20) DEFAULT 'Medium',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 
CREATE TABLE activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Running locally

Clone the repository and install the backend dependencies.

```bash
git clone https://github.com/safa-2186/TaskFlow-PFA.git
cd TaskFlow-PFA/backend
npm install
```

Create a .env file with your local configuration.

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskflow
JWT_SECRET=your_secret_key
```

Run the SQL shema above to set up the database,then start the server.

```bash
node server.js
```

## API reference

Authentication endpoints handle registration and login.
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in and receive a token |


Task endpoints require a valid token in the Authorization header.
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks for the logged in user |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| PATCH | /tasks/:id | Update task status |
| DELETE | /tasks/:id | Delete a task |
| GET | /tasks/activity | Get the recent activity log |
| GET | /tasks/stats/weekly | Get weekly task statistics |