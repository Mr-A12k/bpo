// This is a mock database service
// In a real application, you would use a proper MySQL client like mysql2

// export interface User {
//   id: string
//   name: string
//   email: string
//   role: "client" | "employee" | "admin"
//   createdAt: Date
// }

// export interface Task {
//   id: string
//   title: string
//   description: string
//   clientId: string
//   assignedToId: string | null
//   status: "pending" | "in_progress" | "completed"
//   priority: "low" | "medium" | "high" | "urgent"
//   createdAt: Date
//   updatedAt: Date
// }

// // Mock database functions
// export async function getUser(id: string): Promise<User | null> {
//   // In a real app, you would query the database
//   // const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
//   // return rows[0] || null

//   // Mock implementation
//   return {
//     id,
//     name: "John Doe",
//     email: "john@example.com",
//     role: "client",
//     createdAt: new Date(),
//   }
// }

// export async function createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> {
//   // In a real app, you would insert into the database
//   // const [result] = await db.query(
//   //   'INSERT INTO tasks (title, description, clientId, status, priority) VALUES (?, ?, ?, ?, ?)',
//   //   [task.title, task.description, task.clientId, task.status, task.priority]
//   // )

//   // Mock implementation
//   return {
//     id: `TASK-${Math.floor(Math.random() * 1000)}`,
//     ...task,
//     assignedToId: null,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }
// }

// export async function assignTask(taskId: string, employeeId: string): Promise<void> {
//   // In a real app, you would update the database
//   // await db.query(
//   //   'UPDATE tasks SET assignedToId = ?, status = "in_progress", updatedAt = NOW() WHERE id = ?',
//   //   [employeeId, taskId]
//   // )

//   // Mock implementation
//   console.log(`Task ${taskId} assigned to employee ${employeeId}`)
// }

// export async function updateTaskStatus(taskId: string, status: Task["status"]): Promise<void> {
//   // In a real app, you would update the database
//   // await db.query(
//   //   'UPDATE tasks SET status = ?, updatedAt = NOW() WHERE id = ?',
//   //   [status, taskId]
//   // )

//   // Mock implementation
//   console.log(`Task ${taskId} status updated to ${status}`)
// }







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