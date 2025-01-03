import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
    host: "localhost",       // Host database (default: localhost)
    user: "postgres",        // Username database (default PostgreSQL adalah "postgres")
    password: "adamhaykal0987", // Ganti dengan password PostgreSQL kamu
    database: "blog_app",        // Nama database
    port: 5432,              // Port PostgreSQL (default: 5432)
});

db.connect()
    .then(() => console.log("Connected to PostgreSQL database."))
    .catch((err) => console.error("Error connecting to PostgreSQL:", err.message));