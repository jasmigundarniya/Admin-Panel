import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import TourPackages from "./Components/TourPackages";
import User from "./Components/User";
import BookingDetails from "./Components/BookingDetails";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import UserDetail from "./Components/UserDetail";
import ChangePassword from "./Components/ChangePassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tourpackages" element={<TourPackages />} />
        <Route path="/user" element={<User />} />
        <Route path="/bookingdetails" element={<BookingDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userdetail" element={<UserDetail />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
