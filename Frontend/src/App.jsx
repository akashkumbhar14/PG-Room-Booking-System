import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AvailableRooms from './components/AvailableRooms';
import PrivateRoute from './components/PrivateRoute';

import RoomDetails from './components/RoomDetails';
import UserProfile from './components/UserProfile';
import OwnerProfile from './components/OwnerProfile';
import AddRoom from './components/AddRoom';
import EditRoom from './components/EditRoom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* 🔒 Protected Route for Available Rooms */}
        <Route path="/rooms" element={
          <PrivateRoute>
            <AvailableRooms />
          </PrivateRoute>
        } />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/owner" element={<OwnerProfile />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/edit-room/:roomId" element={<EditRoom/>}/>

      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
