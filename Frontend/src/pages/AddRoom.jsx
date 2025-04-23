import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const AddRoom = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomName: "",
    ownerName: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    availabilityDate: "",
    facilities: [],
    status: "Available",
    images: [],
    partners: 3,
  });

  const facilityOptions = [
    "Kitchen Facilities", "Internet availability(Wi-Fi)", "Parking Facilities",
    "Hot Water", "Attach bathroom", "Balcony", "Bed", "Wardrobe",
    "Chair", "Desk", "single room", "shared room"
  ];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFacilityToggle = (facility) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalImages = [...form.images, ...newFiles];

    if (totalImages.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      setForm({ ...form, images: totalImages.slice(0, 3) });
    } else {
      setForm({ ...form, images: totalImages });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Room details submitted!");
  };

  return (
    <div className="bg-orange-100 min-h-screen p-6 font-sans">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="text-2xl text-black mb-4">
        <IoIosArrowBack />
      </button>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-6">

        {/* Room Name */}
        <input
          type="text"
          name="roomName"
          placeholder="--Enter Room name--"
          value={form.roomName}
          onChange={handleInputChange}
          className="block mx-auto text-center px-4 py-2 w-72 bg-yellow-100 rounded-full border border-gray-300"
        />

        {/* Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "ownerName", placeholder: "--Room owner name--" },
            { name: "email", placeholder: "--email address--" },
            { name: "phone", placeholder: "--Phone number--" },
            { name: "altPhone", placeholder: "--Alternate Phone number--" },
            { name: "address", placeholder: "--Address--" },
            { name: "landmark", placeholder: "--Land mark--" },
            { name: "city", placeholder: "--City--" },
            { name: "state", placeholder: "--State--" },
          ].map((input, i) => (
            <input
              key={i}
              name={input.name}
              placeholder={input.placeholder}
              value={form[input.name]}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-full border bg-gray-100"
            />
          ))}
        </div>

        {/* Facilities */}
        <div>
          <h3 className="text-lg font-semibold text-[#7472E0] mb-2">Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm font-medium">
            {facilityOptions.map((facility, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.facilities.includes(facility)}
                  onChange={() => handleFacilityToggle(facility)}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        {/* Availability & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
          <div className="text-sm">
            Availability Date:
            <input
              type="text"
              name="availabilityDate"
              placeholder="DD - MM - YYYY"
              value={form.availabilityDate}
              onChange={handleInputChange}
              className="ml-2 px-3 py-1 rounded border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setForm({ ...form, status: "Available" })}
              className={`px-4 py-1 rounded-full ${form.status === "Available" ? "bg-[#7472E0] text-white" : "bg-gray-200"}`}
            >
              Available
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, status: "Sold" })}
              className={`px-4 py-1 rounded-full ${form.status === "Sold" ? "bg-[#7472E0] text-white" : "bg-gray-200"}`}
            >
              Sold
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            Number of partners:
            <span className="bg-purple-200 text-purple-800 rounded-full px-2 py-0.5 text-xs">
              {form.partners}
            </span>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <p className="font-semibold">Ratings</p>
          <div className="flex text-yellow-400 text-xl">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < 2 ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
        </div>

        {/* Upload Images with Remove Option */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {form.images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={URL.createObjectURL(img)}
                alt={`room-${i}`}
                className="w-40 h-28 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(i)}
                className="absolute top-1 right-1 text-xs text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full px-1"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          ))}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={form.images.length >= 3}
            className="bg-yellow-200 text-black px-4 py-2 rounded shadow"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-orange-400 text-white px-6 py-2 rounded-full shadow hover:bg-orange-500"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
