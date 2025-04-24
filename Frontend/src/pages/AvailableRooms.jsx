import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt, FaStar, FaWifi, FaShower, FaUtensils, FaTv,
  FaCar, FaBed, FaChair,
} from "react-icons/fa";

const facilityIcons = {
  "Wi-Fi": <FaWifi title="Wi-Fi" />,
  "Hot Water": <FaShower title="Hot Water" />,
  "Kitchen": <FaUtensils title="Kitchen" />,
  "Parking": <FaCar title="Parking" />,
  "Attach Bathroom": <FaShower title="Attach Bathroom" />,
  "Balcony": <FaTv title="Balcony" />,
  "Bed": <FaBed title="Bed" />,
  "Chair": <FaChair title="Chair" />,
  "Desk": <FaChair title="Desk" />,
  "Wardrobe": <FaChair title="Wardrobe" />,
};

const allFacilities = Object.keys(facilityIcons);

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
<<<<<<< HEAD
=======
  const [tempPriceRange, setTempPriceRange] = useState(10000);
  const [tempSelectedFacilities, setTempSelectedFacilities] = useState([]);
>>>>>>> 44fcaaaef96478cee2ba03768fed7bee0a6f97bb
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const params = {
        maxPrice: priceRange,
<<<<<<< HEAD
        ...(statusFilter !== "All" && { status: statusFilter }),
        ...(selectedFacilities.length > 0 && { facilities: selectedFacilities.join(",") }),
      };

      const response = await axios.get("http://localhost:8000/api/v1/rooms/available", { params });
=======
        ...(selectedFacilities.length > 0 && {
          facilities: selectedFacilities.join(","),
        }),
      };

      const response = await axios.get(
        "http://localhost:8000/api/v1/rooms/available",
        { params }
      );

>>>>>>> 44fcaaaef96478cee2ba03768fed7bee0a6f97bb
      setRooms(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load rooms.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
<<<<<<< HEAD
  }, [priceRange, statusFilter, selectedFacilities]);
=======
  }, [priceRange, selectedFacilities]);
>>>>>>> 44fcaaaef96478cee2ba03768fed7bee0a6f97bb

  const handleFacilityChange = (facility) => {
    setTempSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const handleRoomClick = (id) => {
    navigate(`/rooms/${id}`);
  };
<<<<<<< HEAD
=======

  const applyFilters = () => {
    setPriceRange(tempPriceRange);
    setSelectedFacilities(tempSelectedFacilities);
  };
>>>>>>> 44fcaaaef96478cee2ba03768fed7bee0a6f97bb

  return (
    <div className="px-4 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-[#7472E0] mb-6 text-center">
        Available Rooms
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 max-w-8xl mx-auto pl-14 pr-14">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-[260px] bg-white rounded-xl shadow p-5 shrink-0 h-fit">
          <h3 className="text-xl font-semibold text-[#7472E0] mb-4">Filters</h3>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-1">Max Price</label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={tempPriceRange}
              onChange={(e) => setTempPriceRange(Number(e.target.value))}
              className="w-full accent-[#7472E0]"
            />
            <span className="block text-[#7472E0] font-semibold mt-1">
              Rs. {tempPriceRange}
            </span>
          </div>

          <div className="mb-6">
<<<<<<< HEAD
            <label className="block font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          <div>
=======
>>>>>>> 44fcaaaef96478cee2ba03768fed7bee0a6f97bb
            <label className="block font-medium text-gray-700 mb-2">Facilities</label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {allFacilities.map((facility) => (
                <label key={facility} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={facility}
                    checked={tempSelectedFacilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                    className="accent-[#7472E0]"
                  />
                  {facility}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="w-full mt-4 bg-[#7472E0] text-white py-2 px-4 rounded-lg hover:bg-[#5e5bcf] transition"
          >
            Apply Filters
          </button>
        </div>

        {/* Room Grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <p className="text-center text-gray-500">Loading rooms...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white shadow rounded-2xl overflow-hidden relative cursor-pointer transition hover:scale-[1.01]"
                  onClick={() => handleRoomClick(room._id)}
                >
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{room.address}</p>
                    <div className="flex items-center text-sm text-[#7472E0] mb-2">
                      <FaMapMarkerAlt className="mr-1" /> Mumbai
                    </div>
                    <div className="flex flex-wrap gap-2 text-[#7472E0] mb-3">
                      {room.facilities.map((f) => (
                        <div key={f} title={f}>
                          {facilityIcons[f] || f}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="font-bold text-[#7472E0]">
                        Rs. {room.price} <span className="text-sm text-gray-500">/month</span>
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          room.status === "Available"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {room.status}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#7472E0] text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <FaStar className="mr-1" /> {room.rating?.toFixed(1) || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && rooms.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No rooms match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableRooms;
