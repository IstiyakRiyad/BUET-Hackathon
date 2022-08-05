import React, { useEffect, useState } from "react";
import { getTokenOrRefresh } from "../../utils/token";
import styles from "./SoundComponent.module.css";
import { Container } from "react-bootstrap";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import {
  createNote,
  getMusic,
  getNews,
  getWeb,
  setDisplayText,
  setFind,
} from "../../actions/Search.action";
import { connect } from "react-redux";
import micOn from "../../assets/Voice/mic.png";
import micOff from "../../assets/Voice/search.png";
import { analyzeText } from "../../utils/analyseText";
import { getLocation } from "../../utils/getGeoLocation";
import { setDashboard } from "../../actions/Dashboard.action";
import { toast } from "react-toastify";
import { useSpeechSynthesis } from "react-speech-kit";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

const SoundComponent = ({
  displayText,
  setDisplayText,
  getMusic,
  setDashboard,
  getNews,
  createNote,
  setFind,
  getWeb,
}) => {
  const { speak } = useSpeechSynthesis();
  const [tkn, setTkn] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const setToken = async () => {
      const tokenRes = await getTokenOrRefresh();
      if (tokenRes.authToken === null) {
        setTkn({
          displayText: "FATAL_ERROR: " + tokenRes.error,
        });
      }
    };

    setToken();
  }, []);

  const sttFromMic = async () => {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    setDisplayText("Listening...");

    recognizer.recognizeOnceAsync(async (result) => {
      let displayText;
      if (result.reason === ResultReason.RecognizedSpeech) {
        displayText = `${result.text}`;
      } else {
        displayText =
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
      }
      setDisplayText(displayText);
      let rslt = analyzeText(displayText);

      if (rslt !== null) {
        if (rslt.type === "news") {
          let loc = await getLocation();

          if (loc !== null) {
            let check = await getNews(loc.lat, loc.lng, rslt.text);
            if (check) {
              setDisplayText("Showing news!");
              speak({
                text: `Showing news of your area`,
              });
            } else {
              setDisplayText(
                "Sorry, we couldn't find any news for your location!"
              );
            }
            setDashboard("news");
          } else {
            toast.error("Geolocation is required to use this feature");
          }
        } else if (rslt.type === "music") {
          console.log("MUSIC");
          let check = await getMusic(rslt.text);
          setDashboard("music");
          if (check) {
            setDisplayText("Your search result is ready!");
            speak({
              text: `Showing results for music ${rslt.text}`,
            });
          } else {
            setDisplayText(
              "Sorry, we couldn't find any result for your search!"
            );
          }
        } else if (rslt.type === "web") {
          let check = await getWeb(rslt.text);
          setDashboard("search");
          if (check) {
            setDisplayText("Your search result is ready!");
            speak({
              text: `Showing results from the web for ${rslt.text}`,
            });
          } else {
            setDisplayText(
              "Sorry, we couldn't find any result for your search!"
            );
          }
        } else if (rslt.type === "create-note") {
          let check = await createNote(rslt.text);
          setDashboard("notes");
          if (check) {
            setDisplayText("Note added!");
            speak({
              text: `Your note ${rslt.text} has been added`,
            });
          } else {
            setDisplayText(
              "Sorry, we couldn't find any result for your search!"
            );
          }
        } else if (rslt.type === "find-note") {
          setFind(rslt.text.replace(".", ""));
          setDashboard("notes");

          setDisplayText("Notes searched!");
          speak({
            text: `Your search result is ready!`,
          });
        } else if (rslt.type === "reset-note") {
          setFind("");
          setDashboard("notes");

          setDisplayText("Search reset!");
          speak({
            text: `Your search has been reset!`,
          });
        } else if (rslt.type === "page") {
          setDashboard(rslt.text);
          setDisplayText(`Showing ${rslt.text} page!`);
          speak({
            text: `Switched to ${rslt.text} page`,
          });
        }
      }
    });
  };

  const startListening = () => {
    setIsListening(true);
    sttFromMic();
  };

  const fileChange = async (event) => {
    const audioFile = event.target.files[0];
    console.log(audioFile);
    const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

    setDisplayText(fileInfo);

    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFile);
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.recognizeOnceAsync((result) => {
      let displayText;
      if (result.reason === ResultReason.RecognizedSpeech) {
        displayText = `${result.text}`;
      } else {
        displayText =
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
      }
      setDisplayText(fileInfo + displayText);
    });

    setIsListening(false);
  };
  return (
    <Container className="app-container">
      <div className={styles.wrapper}>
        <div className={styles.comment}>{displayText}</div>
        <div className={styles.icon_wrapper}>
          {displayText === "Listening..." ? (
            <img src={micOff} alt="mic" className={styles.icon} />
          ) : (
            <img
              src={micOn}
              alt="mic"
              className={styles.icon}
              onClick={() => startListening()}
            />
          )}
        </div>
      </div>

      <div className="row main-container">
        <div className="col-6">
          <div className="mt-2">
            <input
              type="file"
              id="audio-file"
              onChange={(e) => fileChange(e)}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  displayText: state.search.text,
});

export default connect(mapStateToProps, {
  setDisplayText,
  getMusic,
  setDashboard,
  getNews,
  createNote,
  setFind,
  getWeb,
})(SoundComponent);
