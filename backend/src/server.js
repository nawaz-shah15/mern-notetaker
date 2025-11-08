import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();

// ✅ CORS must be before any routes or middleware that send responses
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Rate limiter (after cors)
app.use(rateLimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

// ✅ Start server after DB connect
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});





// import dotenv from 'dotenv';
// import cors from "cors";
// import { connectDB } from './config/db.js';
// import express from 'express';
// import notesRoutes from './routes/notesRoutes.js';
// import rateLimiter from './middleware/rateLimiter.js';
// // const express = require("express")

// dotenv.config();

// const app = express();
// console.log(process.env.MONGO_URI);


// app.use(express.json());
// app.use(rateLimiter)
// const PORT = process.env.PORT || 5001;



// // middleware
// // app.use(express.json());

// // What is an endpoint?
// // An endpoint is a combination of a URL + HTTP method that lets 
// // the client interact with a specific reource

// app.use("/api/notes", notesRoutes)
// connectDB().then(()=>{
// app.listen(PORT, () => {
//     console.log("Server started on PORT:", PORT);
    
// })
// })



