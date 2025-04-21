import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar, FaTimes } from "react-icons/fa";

const sampleRoomData = {
  roomName: "Deluxe Room A1",
  ownerName: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  altPhone: "9123456789",
  address: "123 Main Street",
  landmark: "Near Central Park",
  city: "New York",
  state: "NY",
  availabilityDate: "2025-05-01",
  facilities: ["Internet availability(Wi-Fi)", "Hot Water", "Balcony"],
  status: "Available",
  partners: 2,
  images: [],
};

const facilityOptions = [
  "Kitchen Facilities", "Internet availability(Wi-Fi)", "Parking Facilities",
  "Hot Water", "Attach bathroom", "Balcony", "Bed", "Wardrobe",
  "Chair", "Desk", "single room", "shared room"
];

const EditRoom = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(sampleRoomData);

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
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated room details:", form);
    alert("Room details updated!");
  };

  return (
    <div className="bg-orange-100 min-h-screen p-6 font-sans">
      <button onClick={() => navigate(-1)} className="text-2xl text-black mb-4">
        <IoIosArrowBack />
      </button>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-6">
        <input
          type="text"
          name="roomName"
          placeholder="--Enter Room name--"
          value={form.roomName}
          onChange={handleInputChange}
          className="block mx-auto text-center px-4 py-2 w-72 bg-yellow-100 rounded-full border border-gray-300"
        />

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

        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <p className="font-semibold">Ratings</p>
          <div className="flex text-yellow-400 text-xl">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < 2 ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
        </div>

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
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-[2px] text-red-600 hover:text-red-800"
                title="Remove image"
              >
                <FaTimes size={14} />
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

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-[#7472E0] text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;

















// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import { FaStar, FaTimes } from "react-icons/fa";

// const sampleRoomData = {
//   id: "room123",
//   roomName: "1 Big Hall at Ichalkaranji",
//   ownerName: "Rahul Patil",
//   email: "rahulpatil@gmail.com",
//   phone: "9898989898",
//   altPhone: "9876543210",
//   address: "Shivaji Nagar, Ichalkaranji",
//   landmark: "Near Big Bazaar",
//   city: "Ichalkaranji",
//   state: "Maharashtra",
//   availabilityDate: "2025-05-01",
//   facilities: ["Internet availability(Wi-Fi)", "Hot Water", "Balcony"],
//   status: "Available",
//   partners: 2,
//   images: [
//     "/assets/room1.jpg",
//     "/assets/room2.jpg",
//     "/assets/room3.jpg",
//   ],
// };

// const facilityOptions = [
//   "Kitchen Facilities", "Internet availability(Wi-Fi)", "Parking Facilities",
//   "Hot Water", "Attach bathroom", "Balcony", "Bed", "Wardrobe",
//   "Chair", "Desk", "single room", "shared room"
// ];

// const EditRoom = () => {
//   const navigate = useNavigate();
//   const { roomId } = useParams();
//   const [form, setForm] = useState(null);

//   useEffect(() => {
//     // Simulate fetching data by roomId
//     if (roomId === sampleRoomData.id) {
//       setForm({ ...sampleRoomData, images: sampleRoomData.images.map(img => ({ src: img, isFile: false })) });
//     }
//   }, [roomId]);

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFacilityToggle = (facility) => {
//     setForm((prev) => ({
//       ...prev,
//       facilities: prev.facilities.includes(facility)
//         ? prev.facilities.filter((f) => f !== facility)
//         : [...prev.facilities, facility],
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const newFiles = Array.from(e.target.files).map(file => ({
//       file,
//       src: URL.createObjectURL(file),
//       isFile: true,
//     }));
//     const totalImages = [...form.images, ...newFiles];

//     if (totalImages.length > 3) {
//       alert("You can only upload a maximum of 3 images.");
//       setForm({ ...form, images: totalImages.slice(0, 3) });
//     } else {
//       setForm({ ...form, images: totalImages });
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const updatedImages = [...form.images];
//     updatedImages.splice(index, 1);
//     setForm({ ...form, images: updatedImages });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated room details:", form);
//     alert("Room details updated!");
//     navigate("/available-rooms");
//   };

//   if (!form) return <div className="p-10 text-center text-lg font-semibold">Loading room data...</div>;

//   return (
//     <div className="bg-orange-100 min-h-screen p-6 font-sans">
//       <button onClick={() => navigate(-1)} className="text-2xl text-black mb-4">
//         <IoIosArrowBack />
//       </button>

//       <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-6">
//         <input
//           type="text"
//           name="roomName"
//           placeholder="--Enter Room name--"
//           value={form.roomName}
//           onChange={handleInputChange}
//           className="block mx-auto text-center px-4 py-2 w-72 bg-yellow-100 rounded-full border border-gray-300"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {["ownerName", "email", "phone", "altPhone", "address", "landmark", "city", "state"].map((name, i) => (
//             <input
//               key={i}
//               name={name}
//               placeholder={`--${name.replace(/([A-Z])/g, ' $1')}--`}
//               value={form[name]}
//               onChange={handleInputChange}
//               className="px-4 py-2 rounded-full border bg-gray-100"
//             />
//           ))}
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold text-[#7472E0] mb-2">Facilities</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm font-medium">
//             {facilityOptions.map((facility, idx) => (
//               <label key={idx} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={form.facilities.includes(facility)}
//                   onChange={() => handleFacilityToggle(facility)}
//                 />
//                 {facility}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
//           <div className="text-sm">
//             Availability Date:
//             <input
//               type="text"
//               name="availabilityDate"
//               value={form.availabilityDate}
//               onChange={handleInputChange}
//               className="ml-2 px-3 py-1 rounded border border-gray-300"
//             />
//           </div>

//           <div className="flex items-center gap-4">
//             {["Available", "Sold"].map(status => (
//               <button
//                 key={status}
//                 type="button"
//                 onClick={() => setForm({ ...form, status })}
//                 className={`px-4 py-1 rounded-full ${form.status === status ? "bg-[#7472E0] text-white" : "bg-gray-200"}`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-2 text-sm">
//             Partners:
//             <span className="bg-purple-200 text-purple-800 rounded-full px-2 py-0.5 text-xs">
//               {form.partners}
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col items-center justify-center gap-2 mt-6">
//           <p className="font-semibold">Ratings</p>
//           <div className="flex text-yellow-400 text-xl">
//             {[...Array(5)].map((_, i) => (
//               <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
//           {form.images.map((img, i) => (
//             <div key={i} className="relative group">
//               <img
//                 src={img.src}
//                 alt={`room-${i}`}
//                 className="w-40 h-28 object-cover rounded-xl"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(i)}
//                 className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-[2px] text-red-600 hover:text-red-800"
//               >
//                 <FaTimes size={14} />
//               </button>
//             </div>
//           ))}
//           {form.images.length < 3 && (
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="bg-yellow-200 text-black px-4 py-2 rounded shadow"
//             />
//           )}
//         </div>

//         <div className="flex justify-center mt-10">
//           <button
//             type="submit"
//             className="bg-[#7472E0] text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditRoom;
