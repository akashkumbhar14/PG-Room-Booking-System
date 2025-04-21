import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";
import { Room } from "../models/room.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createRoom = asyncHandler(async (req, res) => {
    const { roomId, name, location, price, status, distance, rating, facilities, images } = req.body;

    if ([roomId, name, location, price, status, distance].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedRoom = await Room.findOne({ roomId });

    if (existedRoom) {
        throw new ApiError(409, "Room with this ID already exists");
    }

    const room = await Room.create({
        roomId,
        name,
        location,
        price,
        status,
        distance,
        rating,
        facilities,
        images
    });

    if (!room) {
        throw new ApiError(500, "Failed to create room");
    }

    return res.status(201).json(new ApiResponse("Room created successfully", room));
});

export {
    createRoom,
}