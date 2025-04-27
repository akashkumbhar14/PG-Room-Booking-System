import { Notification } from "../models/notification.model.js";

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user-specific room
    socket.on('join-user-room', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

const emitNotification = (io, userId, message, bookingId) => {
  io.to(`user-${userId}`).emit('new-notification', {
    message,
    bookingId,
    timestamp: new Date()
  });
};


export {
    initializeSocket,
    emitNotification
}