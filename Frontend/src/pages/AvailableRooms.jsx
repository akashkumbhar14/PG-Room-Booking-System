import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaShower,
  FaUtensils,
  FaTv,
  FaCar,
  FaBed,
  FaChair,
} from "react-icons/fa";

import EconomySingle from "../assets/Economy Single Room.jpg";
import SharedRoom from "../assets/Shared-Room.jpg";
import LuxurySingle from "../assets/Luxury Single Room.jpg";
import DoubleRoom from "../assets/Double-Room.jpg";
import SingleRoom from "../assets/Single-Room.jpg";
import homeroom from "../assets/homeroom.avif";

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

const allRooms = [
  {
    id: "1000",
    name: "Sunny Studio in City Center",
    location: "Station Road, Ichalkaranji",
    price: 6522,
    status: "Available",
    distance: "2.6 km from GwarKo",
    rating: 2.6,
    facilities: ["Chair", "Hot Water", "Bed", "Attach Bathroom", "Wi-Fi", "Kitchen"],
    image: EconomySingle,
  },
  {
    id: "1001",
    name: "Cozy Room with Balcony",
    location: "Station Road, Ichalkaranji",
    price: 8491,
    status: "Booked",
    distance: "1.9 km from GwarKo",
    rating: 3.7,
    facilities: ["Desk", "Bed", "Kitchen", "Attach Bathroom", "Parking", "Wi-Fi"],
    image: SharedRoom,
  },
  {
    id: "1002",
    name: "Modern Flat near Market",
    location: "Residential Area, Latipur",
    price: 9235,
    status: "Booked",
    distance: "1.1 km from GwarKo",
    rating: 4.1,
    facilities: ["Attach Bathroom", "Bed", "Hot Water"],
    image: LuxurySingle,
  },
  {
    id: "1003",
    name: "Spacious Hall in Residential Area",
    location: "Market Area, Lalitpur",
    price: 8954,
    status: "Available",
    distance: "1.4 km from GwarKo",
    rating: 3.2,
    facilities: ["Parking", "Balcony", "Chair", "Kitchen", "Bed"],
    image: DoubleRoom,
  },
  {
    id: "1004",
    name: "Shared Room near College",
    location: "Station Road, Ichalkaranji",
    price: 6784,
    status: "Available",
    distance: "2.8 km from GwarKo",
    rating: 4.5,
    facilities: ["Hot Water", "Wi-Fi", "Parking", "Desk"],
    image: SingleRoom,
  },
  {
    id: "1005",
    name: "Luxury Suite",
    location: "College Road, Latipur",
    price: 6147,
    status: "Booked",
    distance: "2.7 km from GwarKo",
    rating: 4.1,
    facilities: ["Balcony", "Parking", "Wardrobe", "Chair"],
    image: EconomySingle,
  },
  {
    id: "1006",
    name: "Budget Room in Quiet Neighborhood",
    location: "Market Area, Lalitpur",
    price: 5139,
    status: "Available",
    distance: "2.3 km from GwarKo",
    rating: 3.3,
    facilities: ["Chair", "Attach Bathroom", "Desk", "Wardrobe", "Wi-Fi"],
    image: LuxurySingle,
  },
  {
    id: "1007",
    name: "Fully Furnished Apartment",
    location: "Downtown, Ichalkaranji",
    price: 3992,
    status: "Booked",
    distance: "2.3 km from GwarKo",
    rating: 5.0,
    facilities: ["Wi-Fi", "Wardrobe", "Parking"],
    image: SharedRoom,
  },
  {
    id: "1008",
    name: "Compact Room for Students",
    location: "College Road, Latipur",
    price: 9440,
    status: "Available",
    distance: "2.3 km from GwarKo",
    rating: 3.8,
    facilities: ["Bed", "Wardrobe", "Wi-Fi"],
    image: homeroom,
  },
  {
    id: "1009",
    name: "Double Room with Kitchen Access",
    location: "Market Area, Lalitpur",
    price: 7358,
    status: "Available",
    distance: "1.9 km from GwarKo",
    rating: 3.1,
    facilities: ["Desk", "Wi-Fi", "Kitchen", "Attach Bathroom", "Chair", "Wardrobe"],
    image: DoubleRoom,
  },
  {
    id: "1010",
    name: "Top Floor Room with View",
    location: "Station Road, Ichalkaranji",
    price: 8737,
    status: "Booked",
    distance: "1.7 km from GwarKo",
    rating: 2.8,
    facilities: ["Wi-Fi", "Parking", "Bed", "Kitchen"],
    image: homeroom,
  },
];

const AvailableRooms = () => {
  const [priceRange, setPriceRange] = useState(10000);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleFacilityChange = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const filteredRooms = allRooms.filter((room) => {
    const matchesPrice = room.price <= priceRange;
    const matchesStatus = statusFilter === "All" || room.status === statusFilter;
    const matchesFacilities = selectedFacilities.every((f) =>
      room.facilities.includes(f)
    );
    return matchesPrice && matchesStatus && matchesFacilities;
  });

  return (
    <div className="px-4 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-[#7472E0] mb-6 text-center">
        Available Rooms
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 max-w-8xl mx-auto pl-14 pr-14">
        {/* Left Sidebar (Fixed Width) */}
        <div className="w-full lg:w-[260px] bg-white rounded-xl shadow p-5 shrink-0 h-fit">
          <h3 className="text-xl font-semibold text-[#7472E0] mb-4">Filters</h3>

          {/* Price Filter */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-1">Max Price</label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#7472E0]"
            />
            <span className="block text-[#7472E0] font-semibold mt-1">
              Rs. {priceRange}
            </span>
          </div>

          {/* Status Filter */}
          <div className="mb-6">
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

          {/* Facilities Filter */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Facilities</label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {allFacilities.map((facility) => (
                <label key={facility} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={facility}
                    checked={selectedFacilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                    className="accent-[#7472E0]"
                  />
                  {facility}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Rooms Grid */}
        <div className="flex-1 min-w-0">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white shadow rounded-2xl overflow-hidden relative"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{room.location}</p>
                  <div className="flex items-center text-sm text-[#7472E0] mb-2">
                    <FaMapMarkerAlt className="mr-1" /> {room.distance}
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
                      Rs. {room.price}
                      <span className="text-sm text-gray-500"> /month</span>
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
                  <FaStar className="mr-1" /> {room.rating}
                </div>
              </div>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No rooms match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableRooms;
