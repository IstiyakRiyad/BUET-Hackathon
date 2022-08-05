import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default DashboardPage;
