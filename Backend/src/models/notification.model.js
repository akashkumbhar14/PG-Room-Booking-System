import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['payment', 'booking-status', 'alert'],
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Booking"
    }
}, { timestamps: true });

export const Notification = model("Notification", notificationSchema);