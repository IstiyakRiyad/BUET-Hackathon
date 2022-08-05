import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default RegisterPage;
