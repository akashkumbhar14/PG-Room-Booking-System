import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import ContactUs from './ContactUs';
import heroImage from '../assets/homeroom.avif'; // Importing image properly

import AvailableRooms from './AvailableRooms';
import RoomDetails from './RoomDetails';
import UserProfile from './UserProfile';
import OwnerProfile from './OwnerProfile';
import AddRoom from './AddRoom';
import Footer from './Footer';
const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 font-sans">
      

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Optional: Fancy gradient or blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Find the perfect place at the <span className="text-yellow-400">best price</span>
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Explore our curated list of rooms, flats, and roommates today!
          </p>
          <div className="mt-10 flex justify-center">
            <input
              type="text"
              placeholder="Search by city, area or property..."
              className="w-4/5 md:w-1/2 p-3 rounded-l-full text-gray-900 outline-none shadow-md"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-r-full text-black font-semibold transition shadow-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <HowItWorks />
      <FAQ />
      <ContactUs />

      {/* remaining testing */}
      {/* <AvailableRooms /> */}

      <RoomDetails />
      <UserProfile />
      <OwnerProfile />
      <AddRoom />

      {/* Footer */}
      
    </div>
  );
};

export default Home;
