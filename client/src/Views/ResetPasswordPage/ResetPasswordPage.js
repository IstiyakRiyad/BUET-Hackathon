import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { ResetForm } from "../../components/ResetForm";

const ResetPasswordPage = () => {
  return (
    <div>
      <Navbar />
      <ResetForm />
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
