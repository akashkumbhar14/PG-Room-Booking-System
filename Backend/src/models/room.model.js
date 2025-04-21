import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Available", "Booked"],
    default: "Available",
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  facilities: {
    type: [String],
    default: [],
  },
  images: {
    type: [String], // Array of image URLs or filenames
    required: true,
  }
}, {
  timestamps: true,
});


export const Room = mongoose.model("Room", roomSchema);
