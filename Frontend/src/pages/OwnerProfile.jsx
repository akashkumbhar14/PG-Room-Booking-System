import React, {useEffect, useState} from "react";
 import axios from "axios";
 import {
  FaEdit,
  FaPlus,
  FaHome,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaTrash,
  FaSignOutAlt,
 } from "react-icons/fa";
 import {Link} from "react-router-dom";

 const OwnerProfile = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
   fullName: "",
   username: "",
   phoneNo: "",
  });

  const fetchOwnerProfile = async () => {
   try {
    const res = await axios.get("/api/v1/owner/profile", {
     withCredentials: true,
    });
    if (res.data.success) {
     setOwnerData(res.data.data);
     setFormData({
      fullName: res.data.data.fullName || "",
      username: res.data.data.username || "",
      phoneNo: res.data.data.phoneNo || "",
     });
    }
   } catch (error) {
    console.error("Error fetching owner profile:", error);
   }
  };

  useEffect(() => {
   fetchOwnerProfile();
  }, []);

  const handleProfileUpdate = async () => {
   try {
    const updatedData = {
     fullName: formData.fullName,
     username: formData.username,
     phoneNo: formData.phoneNo,
    };
    const res = await axios.patch("/api/v1/owner/profile", updatedData, {
     withCredentials: true,
    });
    if (res.data.success) {
     setOwnerData(res.data.data);
     setIsEditing(false);
     alert("Profile updated successfully");
    }
   } catch (error) {
    console.error("Failed to update profile:", error);
    alert("Failed to update profile");
   }
  };

  const handleDeleteRoom = async (roomId) => {
   const confirmDelete = window.confirm(
    "Are you sure you want to delete this room?"
   );
   if (!confirmDelete) return;

   try {
    await axios.delete(`/api/v1/rooms/${roomId}`, {withCredentials: true});
    setOwnerData((prevData) => ({
     ...prevData,
     rooms: prevData.rooms.filter((room) => room._id !== roomId),
    }));
    alert("Room deleted successfully");
   } catch (error) {
    console.error("Failed to delete room:", error);
    alert("Failed to delete room");
   }
  };

  const handleLogout = async () => {
   try {
    await axios.post("/api/v1/owner/logout", {}, {withCredentials: true});
    localStorage.clear();
    window.location.href = "/";
   } catch (error) {
    console.error("Logout failed:", error);
    alert("Failed to log out");
   }
  };

  if (!ownerData) {
   return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
   <div className="max-w-6xl mx-auto px-6 py-12">
    {/* Header */}
    <div className="mb-8 flex justify-between items-center">
     <h2 className="text-3xl font-semibold text-gray-800">Owner Profile</h2>
     <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2"
     >
      <FaSignOutAlt /> Log Out
     </button>
    </div>

    {/* Profile Information */}
    <div className="bg-white shadow rounded-lg mb-8 p-6">
     <h3 className="text-xl font-semibold text-gray-700 mb-4">
      Profile Information
     </h3>
     <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {/* Full Name */}
       <div>
        <label className="block text-sm font-medium text-gray-600">
         Full Name
        </label>
        {isEditing ? (
         <input
          type="text"
          className="mt-1 block w-full rounded-md border-2 border-[#7472E0] shadow-sm focus:border-[#7472E0] focus:ring-[#7472E0] sm:text-sm p-2 bg-gray-50"
          value={formData.fullName}
          onChange={(e) =>
           setFormData({...formData, fullName: e.target.value})
          }
         />
        ) : (
         <p className="mt-1 text-sm text-gray-900">{ownerData.fullName}</p>
        )}
       </div>

       {/* Username */}
       <div>
        <label className="block text-sm font-medium text-gray-600">
         Username
        </label>
        {isEditing ? (
         <input
          type="text"
          className="mt-1 block w-full rounded-md border-2 border-[#7472E0] shadow-sm focus:border-[#7472E0] focus:ring-[#7472E0] sm:text-sm p-2 bg-gray-50"
          value={formData.username}
          onChange={(e) =>
           setFormData({...formData, username: e.target.value})
          }
         />
        ) : (
         <p className="mt-1 text-sm text-gray-900">{ownerData.username}</p>
        )}
       </div>

       {/* Email */}
       <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <p className="mt-1 text-sm text-gray-900">{ownerData.email}</p>
       </div>

       {/* Phone Number */}
       <div>
        <label className="block text-sm font-medium text-gray-600">
         Phone Number
        </label>
        {isEditing ? (
         <input
          type="text"
          className="mt-1 block w-full rounded-md border-2 border-[#7472E0] shadow-sm focus:border-[#7472E0] focus:ring-[#7472E0] sm:text-sm p-2 bg-gray-50"
          value={formData.phoneNo}
          onChange={(e) =>
           setFormData({...formData, phoneNo: e.target.value})
          }
         />
        ) : (
         <p className="mt-1 text-sm text-gray-900">{ownerData.phoneNo}</p>
        )}
       </div>
      </div>

      {/* Edit/Save Buttons */}
      <div className="mt-6">
       {isEditing ? (
        <div className="flex gap-2">
         <button
          onClick={handleProfileUpdate}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7472E0] hover:bg-[#5d5bd1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
         >
          <FaEdit className="mr-2" /> Save Changes
         </button>
         <button
          onClick={() => setIsEditing(false)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
         >
          Cancel
         </button>
        </div>
       ) : (
        <button
         onClick={() => setIsEditing(true)}
         className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
        >
         <FaEdit className="mr-2" /> Edit Profile
        </button>
       )}
      </div>
     </div>
    </div>

    {/* Listed Properties */}
    <div className="bg-white shadow rounded-lg p-6">
     <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
       <FaHome className="text-[#7472E0]" /> Listed Properties
      </h3>
      <Link
       to="/add-room"
       className="inline-flex items-center gap-2 bg-[#7472E0] text-white px-4 py-2 rounded-md hover:bg-[#5d5bd1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0] text-sm"
      >
       <FaPlus /> Add New Room
      </Link>
     </div>

     {ownerData.rooms.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {ownerData.rooms.map((room) => (
        <div
         key={room._id}
         className="bg-gray-50 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
         onClick={() => (window.location.href = `/rooms/${room._id}`)}
        >
         <div className="p-4">
          <h4 className="text-lg font-semibold text-[#7472E0] mb-2">
           {room.name}
          </h4>
          <p className="text-sm text-gray-600 mb-1">
           <span className="font-medium text-gray-700">Location:</span>
           {room.address}
          </p>
          <p className="text-sm text-gray-600 mb-2">
           <span className="font-medium text-gray-700">Price:</span> ₹{room.price}
          </p>
          <div className="flex justify-between items-center mt-2">
           <Link
            to={`/edit-room/${room._id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-[#7472E0] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
           >
            <FaEdit /> Edit
           </Link>
           <button
            onClick={(e) => {
             e.stopPropagation();
             handleDeleteRoom(room._id);
            }}
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
           >
            <FaTrash /> Delete
           </button>
          </div>
         </div>
        </div>
       ))}
      </div>
     ) : (
      <div className="py-6 text-center text-gray-500">
       No properties listed yet.
      </div>
     )}
    </div>
   </div>
  );
 };

 export default OwnerProfile;