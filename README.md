### Complete Guide to Set Up and Run the BPO Management System - By Kabix

Happy coding...

This guide will walk you through setting up and running the BPO Management System on a new device with Node.js and npm already installed.

## Step 1: Create a New Project

First, let's create a new Next.js project:

```shellscript
# Create a new directory for your project
mkdir bpo-management-system
cd bpo-management-system

# Initialize a new Next.js project with TypeScript
npx create-next-app@latest . --typescript --eslint --tailwind --app
```

When prompted, select the following options:

- Would you like to use TypeScript? → Yes
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Yes
- Would you like to use `src/` directory? → No
- Would you like to use App Router? → Yes
- Would you like to customize the default import alias? → Yes, use @/* for imports from the root directory


## Step 2: Install Additional Dependencies

Install the required dependencies:

```shellscript
# Install UI components and utilities
npm install @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-tabs class-variance-authority clsx lucide-react tailwind-merge

# Install MySQL client for database connection
npm install mysql2

# Install authentication libraries
npm install jsonwebtoken bcrypt
```

## Step 3: Set Up Database

You'll need to set up a MySQL database for the application:

1. Install MySQL on your device if not already installed
2. Create a new database:


```sql
CREATE DATABASE bpo_management;
USE bpo_management;
```

3. Run the database schema script to create the necessary tables:


```sql
-- Users table for clients, employees, and admins
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('client', 'employee', 'admin') NOT NULL,
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tasks/Requests table
CREATE TABLE tasks (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  client_id VARCHAR(36) NOT NULL,
  assigned_to_id VARCHAR(36),
  status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
  type VARCHAR(100) NOT NULL,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id),
  FOREIGN KEY (assigned_to_id) REFERENCES users(id)
);

-- Task updates/comments for communication
CREATE TABLE task_updates (
  id VARCHAR(36) PRIMARY KEY,
  task_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Task history for tracking changes
CREATE TABLE task_history (
  id VARCHAR(36) PRIMARY KEY,
  task_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Step 4: Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```plaintext
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=bpo_management
DATABASE_USER=your_mysql_username
DATABASE_PASSWORD=your_mysql_password

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the database credentials with your own MySQL username and password. Generate a strong random string for the JWT_SECRET.

## Step 5: Copy Project Files

Now, copy all the project files from the code I provided earlier. Make sure to create the correct folder structure:

1. Create the necessary directories:


```shellscript
mkdir -p app/login app/client/dashboard app/client/submit-request app/employee/dashboard app/admin/dashboard app/admin/assign app/api/auth/login app/api/client/requests app/api/admin/assign app/api/employee/tasks components lib
```

2. Copy each file to its respective location as shown in the project structure.


## Step 6: Configure Database Connection  ** no need for this step (by Kabixx)

Update the `lib/db.ts` file to use an actual MySQL connection instead of the mock implementation:

```typescript
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "employee" | "admin";
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId: string;
  assignedToId: string | null;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: Date;
  updatedAt: Date;
}

// Database functions
export async function getUser(id: string): Promise<User | null> {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE id = ?', 
    [id]
  );
  
  const users = rows as any[];
  return users.length > 0 ? users[0] : null;
}

export async function createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> {
  const [result] = await pool.query(
    'INSERT INTO tasks (id, title, description, client_id, status, priority) VALUES (UUID(), ?, ?, ?, ?, ?)',
    [task.title, task.description, task.clientId, task.status, task.priority]
  );
  
  const insertResult = result as any;
  const [newTask] = await pool.query(
    'SELECT * FROM tasks WHERE id = ?',
    [insertResult.insertId]
  );
  
  const tasks = newTask as any[];
  return tasks[0];
}

export async function assignTask(taskId: string, employeeId: string): Promise<void> {
  await pool.query(
    'UPDATE tasks SET assigned_to_id = ?, status = "in_progress", updated_at = NOW() WHERE id = ?',
    [employeeId, taskId]
  );
}

export async function updateTaskStatus(taskId: string, status: Task["status"]): Promise<void> {
  await pool.query(
    'UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?',
    [status, taskId]
  );
}
```

## Step 7: Run the Development Server

Now you're ready to run the application:

```shellscript
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Step 8: Access the Application

Open your browser and navigate to `http://localhost:3000`. You should see the BPO Management System landing page.

You can log in using the following paths:

- Client login: `/login` (select "Client" radio button)
- Employee login: `/login` (select "Employee" radio button)
- Admin login: `/login` (select "Admin" radio button)


Since this is a development version, the login functionality is mocked and will redirect you to the appropriate dashboard without actual authentication.

## Step 9: Set Up Authentication (Optional)

For a production environment, you'll want to implement proper authentication. Update the `app/api/auth/login/route.ts` file to use actual database authentication:

```typescript
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password, userType } = await request.json();

    // Query the database for the user
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND role = ?', 
      [email, userType]
    );
    
    const users = rows as any[];
    const user = users.length > 0 ? users[0] : null;

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return user info and token
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
```

## Step 10: Add Test Data (Optional)

To test the application with some sample data, you can run the following SQL script:

```sql
-- Insert sample users
INSERT INTO users (id, name, email, password, role, department) VALUES
(UUID(), 'Client User', 'client@example.com', '$2b$10$XdEzfIH5dJpPxJK9mX9Y8.B5A.xXGt1QaMGEolRIVpIGlNhRveGZe', 'client', NULL),
(UUID(), 'Employee User', 'employee@example.com', '$2b$10$XdEzfIH5dJpPxJK9mX9Y8.B5A.xXGt1QaMGEolRIVpIGlNhRveGZe', 'employee', 'Data Processing'),
(UUID(), 'Admin User', 'admin@example.com', '$2b$10$XdEzfIH5dJpPxJK9mX9Y8.B5A.xXGt1QaMGEolRIVpIGlNhRveGZe', 'admin', NULL);

-- The password for all users is 'password123'
```

## Troubleshooting

If you encounter any issues:

1. **Database Connection Errors**:

1. Check your MySQL credentials in the `.env.local` file
2. Ensure MySQL server is running
3. Verify the database and tables exist



2. **Missing Dependencies**:

1. Run `npm install` to ensure all dependencies are installed



3. **TypeScript Errors**:

1. Run `npm run build` to check for TypeScript errors
2. Fix any type issues in your code



4. **API Route Errors**:

1. Check the browser console and server logs for error messages
2. Verify your API routes are correctly implemented





## Next Steps

Once you have the basic application running, you can:

1. Implement actual authentication with JWT
2. Connect to your MySQL database
3. Add file upload functionality
4. Implement real-time notifications
5. Add reporting and analytics features



Happy coding.....
