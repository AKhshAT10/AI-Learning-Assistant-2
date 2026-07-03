import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../backend/config/db.js';
import errorHandler from '../backend/middleware/errorHandler.js';

import authRoutes from '../backend/routes/authRoutes.js';
import documentRoutes from '../backend/routes/documentRoutes.js';
import flashcardRoutes from '../backend/routes/flashcardRoutes.js';
import aiRoutes from '../backend/routes/aiRoutes.js';
import quizRoutes from '../backend/routes/quizRoutes.js';
import progressRoutes from '../backend/routes/progressRoutes.js';

//es6 module __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initiliaze express app
const app = express();

//conect to mongodb
connectDB();

//middleware to handle cors
// Allowed frontend origins. Set CLIENT_URL in production (comma-separated to
// allow more than one, e.g. your Vercel URL + localhost). Use "*" to allow any.
// Trailing slashes are ignored so a small typo doesn't cause a CORS failure.
const stripSlash = (s) => s.trim().replace(/\/+$/, "");
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map(stripSlash)
  .filter(Boolean);
const allowAllOrigins = allowedOrigins.includes("*");

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser clients (curl, health checks) with no Origin header
      if (!origin) return callback(null, true);
      if (allowAllOrigins || allowedOrigins.includes(stripSlash(origin))) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//static folder for uploads
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

//routes
app.use('/api/auth',authRoutes);
app.use('/api/documents',documentRoutes);
app.use('/api/flashcards',flashcardRoutes);
app.use('/api/aiRoutes',aiRoutes);
app.use('/api/quizzes',quizRoutes);
app.use('/api/progress',progressRoutes);


//health check (used by hosting platforms and for quick verification)
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'Preppy API' });
});

app.use(errorHandler);


//404 handler
app.use((req,res)=>{
    res.status(404).json({
        success: false,
        error: 'Route not found',
        statusCode: 404
    });
});

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`);
});

process.on('unhandledRejection',(err)=>{
    console.error(`Error: ${err.message}`);
    process.exit(1);
}); 


//basically routes hot jo routes hai 
//controller meaning jo routes jo kaam krenege wo 
//middleware honge like agar koi protect route bna na ho toh uska function
//models basically models jisme data dalega and store hoga inside the database
