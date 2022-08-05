import React from "react";
import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm/LoginForm";
import Navbar from "../../components/Navbar/Navbar";

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
