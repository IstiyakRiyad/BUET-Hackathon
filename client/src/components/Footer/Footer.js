import React from "react";
import styles from "./Footer.module.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/ai_colored.png";

const Footer = () => {
  return (
    <Container className="py-3">
      <hr />
      <div className="d-flex justify-content-between align-items-center flex-md-row flex-column ">
        <div className="d-flex justify-content-center align-items-center">
          <img src={logo} className={styles.logo} alt="" />{" "}
          <span className="my-auto fs-3">NotBot</span>
        </div>
        <Link to="/terms" className={`lead fs-5  ${styles.link}`}>
          Terms and Conditions
        </Link>
        <span className="lead fs-5">
          &copy;{new Date().getFullYear()} by{" "}
          <span className="text_primary">NotBot Soft</span>
        </span>
      </div>
    </Container>
  );
};

export default Footer;
