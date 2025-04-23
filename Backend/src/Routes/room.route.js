import express from "express";
const router = express.Router();
// Middlewares
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  registerRoom,
  getNearbyAvailableRooms,
  updateRoomStatus,
  getRoomProfile,
  addRoomFeedback,
  updateRoomPrice,
  deleteRoom,
  getAvailableRooms
} from "../controllers/room.controller.js";


// (owner only)
router.route("/register").post(verifyJWT, upload.array("images", 5), registerRoom); // register room
router.route("/:roomId/status").patch(upload.none(),verifyJWT, updateRoomStatus); // update Room Status
router.route("/:roomId/price").patch(upload.none() ,verifyJWT, updateRoomPrice) // update room price
router.route("/:roomId").delete(verifyJWT, deleteRoom) // delete room

// (user only)
router.route("/:roomId/feedback").post(verifyJWT, addRoomFeedback); // adding room feedback

// (public)
router.route("/nearby").get(getNearbyAvailableRooms); // find nearby rooms
router.route("/available").get(getAvailableRooms) // get all available rooms
router.route("/:roomId").get(getRoomProfile); // get a room profile info

export default router;
