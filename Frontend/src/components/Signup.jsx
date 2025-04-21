import React, { useState } from "react";
import axios from "axios";
import signupImg from "../assets/signup.png"; // Make sure image path is correct

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.password !== formData.confirmPassword) {
      return setMessage({ type: "error", text: "Passwords do not match." });
    }

    try {
      const response = await axios.post("/api/v1/users/register", {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        password: formData.password,
        role: formData.role,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage({ type: "success", text: "Signup successful! Please log in." });
        setFormData({
          username: "",
          fullName: "",
          email: "",
          phoneNo: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Signup failed! Try again.",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Image Section */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center bg-[#7472E0] overflow-hidden rounded-r-3xl">
        <img
          src={signupImg}
          alt="Signup"
          className="w-full h-full object-cover rounded-r-3xl animate-fade-in"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-[#7472E0] mb-4">
            Create your account
          </h2>
          {message.text && (
            <p className={`text-center mb-4 ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
              {message.text}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-xl"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-xl"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-xl"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-xl"
              type="tel"
              name="phoneNo"
              placeholder="Phone Number"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="user">User</option>
              <option value="owner">Room Owner</option>
              <option value="admin">Admin</option>
            </select>
            <input
              className="w-full p-3 border border-gray-300 rounded-xl"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-xl"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#7472E0] text-white font-semibold rounded-xl hover:bg-indigo-800 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-[#7472E0] font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
