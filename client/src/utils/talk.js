import sdk from "microsoft-cognitiveservices-speech-sdk";

export const talk = (message) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

  // The language of the voice that speaks.
  speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

  // Create the speech synthesizer.
  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  // Start the synthesizer and wait for a result.
  synthesizer.speakTextAsync(
    message,
    function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
      } else {
        console.error(
          "Speech synthesis canceled, " +
            result.errorDetails +
            "\nDid you set the speech resource key and region values?"
        );
      }
      synthesizer.close();
      synthesizer = null;
    },
    function (err) {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = null;
    }
  );
  console.log("Now synthesizing to: " + audioFile);
};
