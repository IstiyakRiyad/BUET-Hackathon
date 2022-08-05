import React, { useEffect } from "react";
import styles from "./MusicResult.module.css";
import musicImg from "../../assets/Features/music.png";
import { connect } from "react-redux";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Row, Col } from "react-bootstrap";
import { useModals } from "@mantine/modals";
import ReactAudioPlayer from "react-audio-player";
import { setDashboard } from "../../actions/Dashboard.action";
import { setDisplayText } from "../../actions/Search.action";
import { useSpeechSynthesis } from "react-speech-kit";

const MusicResult = ({ music }) => {
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    if (music !== null && music.length > 0) {
      speak({
        text: `Showing music recommendations for previous search`,
      });
    } else if (music !== null && music.length === 0) {
      speak({
        text: `No results for music. Please search again`,
      });
    }
  }, []);
  const modals = useModals();
  const playMusic = (url) => {
    modals.openModal({
      title: null,
      centered: true,
      styles: {
        header: {
          display: "none !important",
        },
        inner: { background: "transparent" },
        modal: { background: "transparent" },
        body: { background: "transparent" },
        root: { background: "transparent" },
      },
      children: (
        <div className="flex" style={{ background: "transparent" }}>
          <ReactAudioPlayer volume={0.3} src={url} autoPlay controls />
        </div>
      ),
    });
  };
  return (
    <Row>
      <span className="d-block text-center fw-light fs-3 pt-4 pb-3">
        Search Result
      </span>
      {music ? (
        music.length === 0 ? (
          <div className={"flex"}>
            <img src={musicImg} alt="" className={styles.img} />
            <span className="d-block text-center fw-light fs-3">
              No Music Found
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
                <Card.Section>
                  <Image src={item.image.url} height={160} alt={item.name} />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>
                    {item.name}{" "}
                    <Badge color="yellow" variant="outline">
                      {(item.duration_ms / 1000 / 60).toFixed(0)}:
                      {((item.duration_ms / 1000) % 60).toFixed(0)} min
                    </Badge>
                  </Text>
                </Group>

                <div className="d-flex flex-column align-items-end justify-content-end">
                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => playMusic(item.preview_url)}
                  >
                    Listen To Preview
                  </Button>
                  <Button
                    onClick={() => {
                      window.open(item.href, "_blank");
                    }}
                    variant="light"
                    color="green"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    Listen on Spotify
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
  music: state.search.music,
});
export default connect(mapStateToProps, { setDashboard, setDisplayText })(
  MusicResult
);
