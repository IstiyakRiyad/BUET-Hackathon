import React from "react";
import styles from "./Hero.module.css";
import { Container } from "react-bootstrap";
import logo from "../../assets/ai_colored.png";

const Hero = () => {
  return (
    <Container>
      <div className="flex py-5">
        <span className="d-block display-1 fw-light large-text">NotBot</span>
        <span className="d-block fs-4 pt-2 fw-light">
          {" "}
          Assistant from the <span className="text_primary">Future</span>
        </span>
      </div>
      <div className="flex">
        <img src={logo} alt="" className={styles.logo} />
      </div>
    </Container>
  );
};

export default Hero;
