import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaBookmark,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    name: "Akash Sharma",
    email: "akash@example.com",
    phone: "+91 9876543210",
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEditToggle = () => setEditMode(true);
  const handleCancel = () => {
    setTempData({ ...userData });
    setEditMode(false);
  };
  const handleSave = () => {
    setUserData({ ...tempData });
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-white py-16 px-6 sm:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-5xl font-extrabold text-[#7472E0] mb-2 leading-tight">
          My Profile
        </h2>
        <p className="text-lg text-gray-600">
          Manage your profile information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 gap-16 p-12 transition-all duration-300">
        {/* Left Side - Editable Info */}
        <div className="space-y-10">
          {/* Header with action */}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
              <FaUser className="text-[#7472E0]" />
              {editMode ? "Edit Profile" : userData.name}
            </h3>
            {!editMode ? (
              <button
                className="text-base flex items-center gap-2 px-5 py-2.5 bg-[#7472E0] text-white rounded-lg hover:bg-[#5d5bd1] transition"
                onClick={handleEditToggle}
              >
                <FaEdit /> Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-base rounded-lg hover:bg-green-700 transition"
                >
                  <FaCheck /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white text-base rounded-lg hover:bg-red-600 transition"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Fields */}
          {[["name", FaUser, "Full Name"], ["email", FaEnvelope, "Email Address"], ["phone", FaPhoneAlt, "Phone Number"]].map(
            ([field, Icon, label]) => (
              <div key={field} className="flex items-start gap-4">
                <Icon className="mt-1 text-2xl text-[#7472E0]" />
                <div className="w-full">
                  <p className="text-[15px] text-gray-500 mb-1">{label}</p>
                  {editMode ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#7472E0] focus:border-[#7472E0] text-lg"
                      value={tempData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  ) : (
                    <p className="text-xl font-medium">{userData[field]}</p>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Right Side - Saved Rooms */}
        <div className="bg-gray-50 rounded-2xl p-8 shadow-inner">
          <div className="flex items-center gap-4 mb-5">
            <FaBookmark className="text-2xl text-[#7472E0]" />
            <h3 className="text-2xl font-semibold text-gray-800">Saved Rooms</h3>
          </div>
          <ul className="space-y-4 text-gray-700 list-disc pl-6 text-lg leading-relaxed">
            <li>2BHK Flat near Hinjewadi, Pune</li>
            <li>Studio Apartment, Bandra, Mumbai</li>
            <li>1BHK PG, Koramangala, Bangalore</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
