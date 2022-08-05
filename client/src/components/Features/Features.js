import React from "react";
import styles from "./Features.module.css";
import { Container, Row, Col } from "react-bootstrap";
import music from "../../assets/Features/music.png";
import notes from "../../assets/Features/notes.png";
import maps from "../../assets/Features/maps.png";
import newspaper from "../../assets/Features/newspaper.png";
import robot from "../../assets/Features/robot.png";
import search from "../../assets/Features/search.png";
const Features = () => {
  return (
    <Container className="py-5">
      <span className="d-block fs-1 fw-light text-center pb-3 pt-md-4 pt-0">
        What We provide
      </span>

      <Row>
        <Col md={4} className="py-3">
          <div className={styles.crd_wrapper}>
            <div className={styles.crd}>
              <img src={robot} alt="music" className={styles.icon} />
              <span className="d-block fs-3 fw-light">Virtual Assistant</span>
            </div>
          </div>
        </Col>
        <Col md={4} className="py-3">
          <div className={styles.crd_wrapper}>
            <div className={styles.crd}>
              <img src={music} alt="music" className={styles.icon} />
              <span className="d-block fs-3 fw-light">Music Recomendation</span>
            </div>
          </div>
        </Col>
        {/* <Col md={4} className="py-3">
          <div className={styles.crd_wrapper}>
            <div className={styles.crd}>
              <img src={maps} alt="music" className={styles.icon} />
              <span className="d-block fs-3 fw-light">Route Planning</span>
            </div>
          </div>
        </Col> */}

        <Col md={4} className="py-3">
          <div className={styles.crd_wrapper}>
            <div className={styles.crd}>
              <img src={search} alt="music" className={styles.icon} />
              <span className="d-block fs-3 fw-light">Web Search</span>
            </div>
          </div>
        </Col>
        <Col md={2}></Col>
        <Col md={4} className="py-3">
          <div className={styles.crd_wrapper}>
            <div className={styles.crd}>
              <img src={newspaper} alt="music" className={styles.icon} />
              <span className="d-block fs-3 fw-light">Online News</span>
            </div>
          </div>
        </Col>
        <Col md={4} className="py-3">
          <div className={styles.crd_wrapper}>
            <div className={styles.crd}>
              <img src={notes} alt="music" className={styles.icon} />
              <span className="d-block fs-3 fw-light">Notes</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features;
