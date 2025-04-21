import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaMapMarkerAlt, FaUserCircle, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Sample room data (simulate fetching from backend)
const sampleRooms = [
  {
    id: "1",
    name: "Spacious Studio Apartment",
    description:
      "Modern studio in the heart of the city with great sunlight and amenities.",
    images: [
      "/assets/room1.jpg",
      "/assets/room2.jpg",
      "/assets/room3.jpg",
    ],
    status: "Available",
    rating: 4.6,
    facilities: {
      wifi: true,
      parking: false,
      ac: true,
      laundry: true,
      kitchen: false,
    },
    address: {
      street: "123 Main Street",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    owner: {
      name: "Alex Johnson",
      contact: "alex.johnson@example.com",
    },
  },
  {
    id: "2",
    name: "Cozy Room in Shared Apartment",
    description:
      "A comfortable room in a peaceful neighborhood, close to transport and shops.",
    images: [
      "/assets/room4.jpg",
      "/assets/room5.jpg",
      "/assets/room6.jpg",
    ],
    status: "Booked",
    rating: 4.1,
    facilities: {
      wifi: true,
      parking: true,
      ac: false,
      laundry: false,
      kitchen: true,
    },
    address: {
      street: "456 Oak Avenue",
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    owner: {
      name: "Jamie Lee",
      contact: "jamie.lee@example.com",
    },
  },
];

const RoomDetails = () => {
  const { id } = useParams();
  const room = sampleRooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="p-8 text-center text-gray-700">
        Room not found.
      </div>
    );
  }

  const renderFacility = (label, isAvailable) => (
    <div className="flex items-center gap-2 text-gray-700">
      {isAvailable ? (
        <FaCheckCircle className="text-green-500" />
      ) : (
        <FaTimesCircle className="text-red-400" />
      )}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#7472E0] mb-4">{room.name}</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-lg overflow-hidden mb-6 shadow-lg"
      >
        {room.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Room image ${index + 1}`}
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-gray-600 text-lg mb-4">{room.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Address and Owner */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#7472E0] mb-2">Address</h3>
          <p className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-[#7472E0]" />
            {`${room.address.street}, ${room.address.city}, ${room.address.state}, ${room.address.country}`}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#7472E0] mb-2">Owner Info</h3>
          <p className="flex items-center gap-2 text-gray-700">
            <FaUserCircle className="text-[#7472E0]" />
            {room.owner.name}
          </p>
          <p className="ml-6 text-sm text-gray-600">{room.owner.contact}</p>
        </div>

        {/* Status and Rating */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#7472E0] mb-2">Room Status</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              room.status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {room.status}
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#7472E0] mb-2">Rating</h3>
          <p className="flex items-center text-yellow-500">
            <FaStar className="mr-2" />
            <span className="text-gray-800">{room.rating} / 5</span>
          </p>
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-[#7472E0] mb-4">Facilities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {renderFacility("Wi-Fi", room.facilities.wifi)}
          {renderFacility("Parking", room.facilities.parking)}
          {renderFacility("AC", room.facilities.ac)}
          {renderFacility("Laundry", room.facilities.laundry)}
          {renderFacility("Kitchen", room.facilities.kitchen)}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
