import React, { useEffect } from "react";
import styles from "./WebResult.module.css";
import musicImg from "../../assets/Features/music.png";
import { connect } from "react-redux";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Row, Col } from "react-bootstrap";
import { useModals } from "@mantine/modals";
import ReactAudioPlayer from "react-audio-player";
import { setDashboard } from "../../actions/Dashboard.action";
import { setDisplayText } from "../../actions/Search.action";
import { useSpeechSynthesis } from "react-speech-kit";

const WebResult = ({ music }) => {
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    if (music !== null && music.length > 0) {
      speak({
        text: `Showing web search results`,
      });
    } else if (music !== null && music.length === 0) {
      speak({
        text: `No results found Please search again`,
      });
    }
  }, []);

  return (
    <Row>
      <span className="d-block text-center fw-light fs-3 pt-4 pb-3">
        Web Search Result
      </span>
      {music ? (
        music.length === 0 ? (
          <div className={"flex"}>
            <img src={musicImg} alt="" className={styles.img} />
            <span className="d-block text-center fw-light fs-3">
              No Web Result Found
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
                  <Text weight={500}>{item.title}</Text>
                </Group>
                <Badge color="yellow" variant="outline">
                  <b>Position: </b> {item.position}
                </Badge>

                <div className="d-flex flex-column align-items-end justify-content-end">
                  <Button
                    onClick={() => {
                      window.open(item.link, "_blank");
                    }}
                    variant="light"
                    color="green"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    Visit Link
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        )
      ) : (
        <div className={"flex"}>
          <img src={musicImg} alt="" className={styles.img} />
          <span className="d-block text-center fw-light fs-3">
            No Music Found. Please Search Again.
          </span>
        </div>
      )}
    </Row>
  );
};
const mapStateToProps = (state) => ({
  music: state.search.web,
});
export default connect(mapStateToProps, { setDashboard, setDisplayText })(
  WebResult
);
