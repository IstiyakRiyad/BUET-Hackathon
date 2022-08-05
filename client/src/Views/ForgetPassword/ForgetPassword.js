import React from "react";
import Footer from "../../components/Footer/Footer";
import { ForgetForm } from "../../components/ForgetForm";
import Navbar from "../../components/Navbar/Navbar";

const ForgetPassword = () => {
  return (
    <div>
      <Navbar />
      <ForgetForm />
      <Footer />
    </div>
  );
};

export default ForgetPassword;
