import React, { useEffect } from "react";
import styles from "./TempOptions.module.css";
import { Container, Row, Col } from "react-bootstrap";
import music from "../../assets/Features/music.png";
import notes from "../../assets/Features/notes.png";
import maps from "../../assets/Features/maps.png";
import newspaper from "../../assets/Features/newspaper.png";
import search from "../../assets/Features/search.png";
import { useNavigate } from "react-router-dom";
import { setDashboard } from "../../actions/Dashboard.action";
import { connect } from "react-redux";
const TempOptions = ({ type, setDashboard }) => {
  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <Container className="py-4">
      <Row>
        <Col md={12} className="py-1">
          <div className={styles.crd_wrapper}>
            <div
              className={`${styles.crd} ${type === "notes" && styles.active}`}
              onClick={() => setDashboard("notes")}
            >
              <img src={notes} alt="music" className={styles.icon} />
              <span className="d-block fs-5 fw-light">Notes</span>
            </div>
          </div>
        </Col>
        <Col md={12} className="py-1">
          <div className={styles.crd_wrapper}>
            <div
              className={`${styles.crd} ${type === "music" && styles.active}`}
              onClick={() => setDashboard("music")}
            >
              <img src={music} alt="music" className={styles.icon} />
              <span className="d-block fs-5 fw-light">Music Recomendation</span>
            </div>
          </div>
        </Col>
        <Col md={12} className="py-1">
          <div className={styles.crd_wrapper}>
            <div
              className={`${styles.crd}  ${type === "news" && styles.active}`}
              onClick={() => setDashboard("news")}
            >
              <img src={newspaper} alt="music" className={styles.icon} />
              <span className="d-block fs-5 fw-light">Online News</span>
            </div>
          </div>
        </Col>
        {/* <Col md={12} className="py-1">
          <div className={styles.crd_wrapper}>
            <div
              className={`${styles.crd}  ${type === "route" && styles.active}`}
              onClick={() => setDashboard("route")}
            >
              <img src={maps} alt="music" className={styles.icon} />
              <span className="d-block fs-5 fw-light">Route Planning</span>
            </div>
          </div>
        </Col> */}
        <Col md={12} className="py-1">
          <div className={styles.crd_wrapper}>
            <div
              className={`${styles.crd}  ${type === "search" && styles.active}`}
              onClick={() => setDashboard("search")}
            >
              <img src={search} alt="music" className={styles.icon} />
              <span className="d-block fs-5 fw-light">Web Search</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  type: state.search.type,
});

export default connect(mapStateToProps, { setDashboard })(TempOptions);
