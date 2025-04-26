import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OwnerProfile = () => {
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      try {
        const res = await axios.get('/api/v1/owner/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Profile response:', res.data);

        // 👇 Adjust this if your data is nested differently
        setOwner(res.data.owner); 
      } catch (error) {
        console.error('Failed to fetch owner profile:', error);
      }
    };

    fetchOwnerProfile();
  }, [token]);

  const handleAddRoom = () => {
    navigate('/add-room');
  };

  if (!owner) {
    return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;
  }

  // ✅ Safely extract values from owner
  const {
    fullName = '',
    email = '',
    username = '',
    phoneNo = '',
    rooms = [],
    profileImage = '',
  } = owner;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Info */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={profileImage || '/default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#7472E0]"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-gray-600">Username: {username}</p>
            <p className="text-gray-600">Email: {email}</p>
            <p className="text-gray-600">Phone: {phoneNo}</p>
          </div>
        </div>
        <button
          onClick={handleAddRoom}
          className="mt-6 md:mt-0 px-6 py-3 bg-[#7472E0] text-white font-semibold rounded-lg hover:bg-[#5e5ccf] transition-all duration-200"
        >
          + Add Room
        </button>
      </div>

      {/* Listed Rooms */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Listed Properties</h3>
      {rooms.length === 0 ? (
        <p className="text-gray-500">You haven't added any rooms yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <img
                src={room.images?.[0] || '/room-placeholder.jpg'}
                alt={room.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{room.title}</h4>
                <p className="text-gray-500 text-sm mb-2 truncate">{room.description}</p>
                <p className="text-[#7472E0] font-bold">₹{room.price} / month</p>
                <button
                  onClick={() => navigate(`/edit-room/${room._id}`)}
                  className="mt-3 text-sm text-[#7472E0] hover:underline"
                >
                  Edit Room
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;
