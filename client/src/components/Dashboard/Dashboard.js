import React from "react";
import TempOptions from "../TempOptions/TempOptions";
import styles from "./Dashboard.module.css";
import { Container, Row, Col } from "react-bootstrap";
import SoundComponent from "../SoundComponent/SoundComponent";
import { connect } from "react-redux";
import MusicResult from "../MusicResult/MusicResult";
import { NewsResult } from "../NewsResult";
import { NoteResults } from "../NoteResults";
import { WebResult } from "../WebResult";

const Dashboard = ({ type }) => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <TempOptions />
        </Col>
        <Col md={9}>
          {type && type === "music" ? (
            <MusicResult />
          ) : type === "news" ? (
            <NewsResult />
          ) : type === "notes" ? (
            <NoteResults />
          ) : type === "search" ? (
            <WebResult />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <SoundComponent />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  type: state.search.type,
});

export default connect(mapStateToProps, null)(Dashboard);
