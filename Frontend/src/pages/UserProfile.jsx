import { useState, useEffect } from "react";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import { Eye, EyeOff } from "lucide-react";
 import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaSignOutAlt, FaHome } from "react-icons/fa";

 const UserProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    username: "", // Added username field
    email: "",
    phoneNo: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [allocatedRooms, setAllocatedRooms] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/v1/users/profile", {
          withCredentials: true
        });
        setUserData(res.data.data);
        setAllocatedRooms(res.data.data.rooms || []);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/v1/users/profile", userData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      setMessage(res.data.message);
      setError("");
      setEditMode(false);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/v1/users/profile/password", passwordData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      setMessage(res.data.message);
      setError("");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Password change failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/owner/logout", {}, { withCredentials: true });
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800">Your Profile</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </div>

      {/* Alert Messages */}
      {(message || error) && (
        <div className={`mb-6 p-3 rounded-md ${message ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message || error}
        </div>
      )}

      {/* Profile Information */}
      <div className="bg-white shadow rounded-lg mb-8 p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-2 border-[#7472E0] shadow-sm focus:border-[#7472E0] focus:ring-[#7472E0] sm:text-sm p-2 bg-gray-50"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{userData.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              {editMode ? (
                <input
                  type="tel"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-2 border-[#7472E0] shadow-sm focus:border-[#7472E0] focus:ring-[#7472E0] sm:text-sm p-2 bg-gray-50"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{userData.username}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              {editMode ? (
                <input
                  type="tel"
                  name="phoneNo"
                  value={userData.phoneNo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-2 border-[#7472E0] shadow-sm focus:border-[#7472E0] focus:ring-[#7472E0] sm:text-sm p-2 bg-gray-50"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{userData.phoneNo}</p>
              )}
            </div>
          </div>

          {/* Edit/Save Buttons */}
          <div className="mt-6">
            {editMode ? (
              <div className="flex gap-2">
                <button
                  type="submit"
                  onClick={handleUpdateProfile}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7472E0] hover:bg-[#5d5bd1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
              >
                <FaUser className="mr-2" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white shadow rounded-lg mb-8 p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h3>
        <div>
          <button
            onClick={() => setShowPasswordForm((prev) => !prev)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
          >
            <FaLock className="mr-2" /> {showPasswordForm ? "Hide Password Form" : "Change Password"}
          </button>

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    id="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="shadow-sm focus:ring-[#7472E0] focus:border-[#7472E0] block w-full sm:text-sm border-gray-300 rounded-md pr-10"
                  />
                  {passwordData.oldPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer" onClick={() => setShowOldPassword(!showOldPassword)}>
                      {showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="shadow-sm focus:ring-[#7472E0] focus:border-[#7472E0] block w-full sm:text-sm border-gray-300 rounded-md pr-10"
                  />
                  {passwordData.newPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7472E0] hover:bg-[#5d5bd1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Allocated Rooms Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FaHome className="text-[#7472E0]" /> Allocated Rooms
          </h3>
          {/* You might not want an "Add Room" button here for users */}
        </div>
        {allocatedRooms.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {allocatedRooms.map((room) => (
              <li key={room._id || room.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{room.name || room.roomNumber || `Room`}</p>
                    <p className="text-sm text-gray-500 truncate">{room.address || room.building || "Main Building"}</p>
                    <p className="text-sm text-gray-500">{room.type || "Standard Room"}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/rooms/${room._id || room.id}`)}
                      className="inline-flex items-center shadow-sm px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7472E0]"
                    >
                      View Details <FaHome className="ml-2" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-6 text-center text-gray-500">No rooms currently allocated to you.</div>
        )}
      </div>
    </div>
  );
 };

 export default UserProfile;