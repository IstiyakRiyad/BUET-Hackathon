import React, { useEffect } from "react";
import styles from "./NoteResults.module.css";
import musicImg from "../../assets/Features/notes.png";
import { connect } from "react-redux";
import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { Row, Col } from "react-bootstrap";

import { setDashboard } from "../../actions/Dashboard.action";
import { deleteNote, setDisplayText } from "../../actions/Search.action";
import { useSpeechSynthesis } from "react-speech-kit";
import Moment from "react-moment";

const NoteResults = ({ music, notes, deleteNote }) => {
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    if (music !== null && music.length > 0) {
      speak({
        text: `Showing your notes.`,
      });
    } else if (music !== null && music.length === 0) {
      speak({
        text: `No notes found. Please add a note first.`,
      });
    }
  }, []);

  return (
    <Row>
      <span className="d-block text-center fw-light fs-3 pt-4 pb-3">
        {" "}
        {notes && music && notes.length !== music.length
          ? "Search Result"
          : "Notes"}
      </span>
      {music ? (
        music.length === 0 ? (
          <div className={"flex"}>
            <img src={musicImg} alt="" className={styles.img} />
            <span className="d-block text-center fw-light fs-3">
              No Notes Found
            </span>
          </div>
        ) : (
          music.map((item, index) => (
            <Col md={4} key={index} className="py-2">
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                className="h-100 position-relative d-block"
              >
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{item.data}</Text>
                </Group>

                <Badge color="yellow" variant="outline">
                  <Moment fromNow>{item.createdAt}</Moment>
                </Badge>

                <div className="d-flex flex-column align-items-end justify-content-end">
                  <Button
                    variant="light"
                    color="red"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => deleteNote(item._id)}
                  >
                    Delete Note
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        )
      ) : (
        <div className={"flex"}>
          <img src={musicImg} alt="notes" className={styles.img} />
          <span className="d-block text-center fw-light fs-3">
            No Notes Found. Please Add A Note First.
          </span>
        </div>
      )}
    </Row>
  );
};
const mapStateToProps = (state) => ({
  music: state.search.find,
  notes: state.search.note,
});
export default connect(mapStateToProps, {
  setDashboard,
  setDisplayText,
  deleteNote,
})(NoteResults);
