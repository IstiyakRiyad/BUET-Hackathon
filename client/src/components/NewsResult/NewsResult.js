import React, { useEffect } from "react";
import styles from "./NewsResult.module.css";
import musicImg from "../../assets/Features/newspaper.png";
import { connect } from "react-redux";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import { getLocation } from "../../utils/getGeoLocation";
import { getNews, setDisplayText } from "../../actions/Search.action";
import { setDashboard } from "../../actions/Dashboard.action";
import { toast } from "react-toastify";
import { useSpeechSynthesis } from "react-speech-kit";

const NewsResult = ({ music, getNews, setDisplayText, setDashboard, text }) => {
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    const getData = async () => {
      let loc = await getLocation();
      if (loc !== null) {
        let check = await getNews(loc.lat, loc.lng, "");
        if (check) {
          setDisplayText("Showing news!");
          speak({ text: `Showing ${music.length} results fro your search` });
        } else {
          setDisplayText("Sorry, we couldn't find any news for your location!");
        }
        setDashboard("news");
      } else {
        toast.error("Geolocation is required to use this feature");
      }
    };
    getData();
  }, []);
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
              No News Found!
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
                  <Image src={item.urlToImage} height={160} alt={item.title} />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text
                    component="a"
                    className={styles.link}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    weight={500}
                  >
                    {item.title.substring(0, 80)}
                  </Text>
                  <Badge color="yellow" variant="outline">
                    {item.source.name}
                  </Badge>
                  <Badge color="blue" variant="outline">
                    <Moment fromNow>{item.publishedAt}</Moment>
                  </Badge>
                </Group>
              </Card>
            </Col>
          ))
        )
      ) : (
        <></>
      )}
    </Row>
  );
};
const mapStateToProps = (state) => ({
  music: state.search.news,
  text: state.search.text,
});
export default connect(mapStateToProps, {
  getNews,
  setDashboard,
  setDisplayText,
})(NewsResult);
