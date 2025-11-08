import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path'

dotenv.config();
const app = express();
const __dirname = path.resolve()



// ✅ CORS must be before any routes or middleware that send responses
if(process.env.NODE_ENV !== "production"){
  app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));
}

// ✅ Body parser
app.use(express.json());

// ✅ Rate limiter (after cors)
app.use(rateLimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"));
});
}

// ✅ Start server after DB connect
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
