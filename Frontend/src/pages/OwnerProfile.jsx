import React from "react";
import { FaEdit, FaPlus, FaHome, FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const OwnerProfile = () => {
  const ownerData = {
    name: "Ravi Patil",
    email: "raviowner@example.com",
    phone: "+91 9898989898",
    properties: [
      {
        id: 1,
        title: "1 Big Hall at Ichalkaranji",
        location: "Ichalkaranji",
        description: "Spacious hall ideal for students or small families.",
      },
      {
        id: 2,
        title: "2BHK Flat at Sangli",
        location: "Sangli",
        description: "Well-furnished 2BHK with balcony and parking.",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#7472E0] mb-2">Owner Profile</h2>
        <p className="text-gray-600">Manage your property listings and profile information</p>
      </div>

      {/* Owner Info */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 grid sm:grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
          <FaUser className="text-[#7472E0] text-xl mt-1" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Name</p>
            <p className="text-lg">{ownerData.name}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaEnvelope className="text-[#7472E0] text-xl mt-1" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Email</p>
            <p className="text-lg">{ownerData.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaPhoneAlt className="text-[#7472E0] text-xl mt-1" />
          <div>
            <p className="font-semibold text-gray-700 text-sm">Contact</p>
            <p className="text-lg">{ownerData.phone}</p>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaHome className="text-[#7472E0]" /> Listed Properties
        </h3>
        <Link
          to="/add-room"
          className="flex items-center gap-2 bg-[#7472E0] text-white px-5 py-2.5 rounded-lg hover:bg-[#5d5bd1] transition text-sm"
        >
          <FaPlus /> Add New Room
        </Link>
      </div>

      {/* Room Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {ownerData.properties.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-[#7472E0] mb-2">{room.title}</h4>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Location:</span> {room.location}
            </p>
            <p className="text-sm text-gray-600 mb-4">{room.description}</p>
            <Link
              to={`/edit-room/${room.id}`}
              className="inline-flex items-center gap-2 text-[#7472E0] text-sm font-medium hover:underline"
            >
              <FaEdit /> Edit Room Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerProfile;
