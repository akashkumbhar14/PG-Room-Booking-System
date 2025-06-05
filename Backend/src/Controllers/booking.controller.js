import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Room } from '../models/room.model.js';
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendNotification } from "../utils/notification.service.js";
import { Notification } from "../models/notification.model.js";

const createBooking = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const userId = req.user._id;

    // 1. Create booking
    const booking = await Booking.create({
        user: userId,
        room: roomId,
        status: "pending",
    });

    // 2. Fetch room details (to get ownerId)
    const room = await Room.findById(roomId).populate('owner');

    // 3. Send notification to room owner
    await sendNotification(req.app.get('io'), {
        receiverId: room.owner._id,
        receiverModel: "Owner",
        message: `New booking request for ${room.name}`,
        type: "booking",
        bookingId: booking._id,
        roomId: room._id
    });

    return res.status(200).json(
        new ApiResponse(200, booking, "Room booked successfully")
    );
});

const updateBookingStatus = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { status, notificationId } = req.body;

    const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
    ).populate('user', 'name email');

    await Notification.findByIdAndUpdate(notificationId, { read: true });


    if ( status === 'approved') {
        await Room.findByIdAndUpdate(booking.room, { status: "Booked"});
    }

    // 1. Send notification to the user
    await sendNotification(req.app.get('io'), {
        receiverId: booking.user._id,
        receiverModel: "User",
        message: `Your booking has been ${status}`,
        type: "booking-status",
        bookingId: booking._id,
        roomId: booking.room
    });

    return res.status(200).json(
        new ApiResponse(200, booking, "Booking status has changed")
    )
});

const getUserBookedRooms = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // 1. Find bookings with status 'approved'
    const bookings = await Booking.find({ 
        user: userId,
        status: "approved"
    }).populate({
        path: "room",
        populate: {
            path: "owner",
            select: "username email"
        }
    });

    // 2. Check if any approved bookings exist
    if (!bookings || bookings.length === 0) {
        return res.status(404).json(
            new ApiResponse(404, [], "No approved booked rooms found for this user")
        );
    }

    // 3. Extract room data
    const bookedRooms = bookings.map((booking) => booking.room);

    // 4. Return only approved rooms
    return res.status(200).json(
        new ApiResponse(200, bookedRooms, "Approved booked rooms fetched successfully")
    );
});


export {
    createBooking,
    updateBookingStatus,
    getUserBookedRooms
};
