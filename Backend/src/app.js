import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./utils/socket.js";

const app = express();

// Middleware
app.use(cors({ 
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Create HTTP server
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize socket
initializeSocket(io);
app.set('io', io);

// Routes
import userRouter from './routes/user.route.js';
import roomRouter from './routes/room.route.js';
import ownerRouter from './routes/owner.route.js';
import verificationRouter from './routes/verification.route.js';
import bookingRouter from './routes/booking.route.js';
import paymentRouter from './routes/payment.route.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/owner", ownerRouter);
app.use("/api/v1/verify", verificationRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/payments", paymentRouter);

app.use(errorHandler);

export { app, httpServer };