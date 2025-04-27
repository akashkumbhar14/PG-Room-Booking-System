import { Notification } from "../models/notification.model.js";

export const sendNotification = async ({ userId, message, type, bookingId }) => {
  const notification = await Notification.create({
    user: userId,
    message,
    type,
    booking: bookingId
  });

  // Get io instance
  const io = req.app.get('io');
  io.to(`user-${userId}`).emit('new-notification', notification);

  return notification;
};