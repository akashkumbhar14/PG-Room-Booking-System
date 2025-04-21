import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Owner } from "../models/owner.model.js";


const addRoom = asyncHandler(async (req, res) => {
    const { name, location, price } = req.body;
    console.log("Request Files:", req.files);
    console.log("Local Paths:", req.files?.map(f => f.path));


    const facilities = JSON.parse(req.body.facilities);

    if (!name || !location || !price) {
        throw new ApiError(400, "Name, location, price");
    }

    // const imageLocalPaths = req.files?.images?.map(file => file.path) || [];

    // const uploadPromises = imageLocalPaths.map(path => uploadOnCloudinary(path));
    // const uploadedImages = await Promise.all(uploadPromises);

    // const imageUrls = uploadedImages
    //   .filter(image => image?.url)
    //   .map(image => image.url);

    // 2. Check files were uploaded
    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "At least one image is required");
    }

    // 3. Process images
    const imageUploadPromises = req.files.map(async (file) => {
        const result = await uploadOnCloudinary(file.path);
        if (!result?.url) {
            throw new ApiError(500, "Failed to upload one or more images");
        }
        return result.url;
    });

    // 4. Wait for all uploads to complete
    let imageUrls;
    try {
        imageUrls = await Promise.all(imageUploadPromises);
    } catch (error) {
        throw new ApiError(500, error.message || "Image upload failed");
    }

    const room = await Room.create({
        name,
        location,
        price,
        facilities: facilities || [],
        images: imageUrls,
        owner: req.user._id,
        status: "Available",
        rating: 0,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, room, "Room added successfully"));

});

export { addRoom };