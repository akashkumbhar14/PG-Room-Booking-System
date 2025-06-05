import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBooking, getUserBookedRooms, updateBookingStatus } from "../Controllers/booking.controller.js";

const router = Router()

router.route("/create-booking/:roomId").post(upload.none(), verifyJWT, createBooking) // create a booking
router.route("/:bookingId").patch( verifyJWT, updateBookingStatus);
router.route("/user-rooms").get( verifyJWT, getUserBookedRooms)  // get all the rooms booked by user

export default router