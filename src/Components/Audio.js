import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";

import aquamanTheme from "../assets/audio/aquaman.mp3";
import artOfSilence from "../assets/audio/art-of-silence.mp3";
import dcTitansTheme from "../assets/audio/dc-titans-theme-song.mp3";
import gapDarkPhoenix from "../assets/audio/gap-dark-phoenix.mp3";

import "react-h5-audio-player/lib/styles.css";

const Audio = () => {
  let [index, setIndex] = useState(0);
  const tab = [artOfSilence, aquamanTheme, gapDarkPhoenix, dcTitansTheme];
  return (
    <AudioPlayer
      className="Audio"
      autoPlay
      src={tab[index]}
      hasDefaultKeyBindings={true}
      showSkipControls={true}
      showJumpControls={true}
      onClickNext={() => setIndex(index++)}
      onClickPrevious={() => setIndex(index--)}
    />
  );
};
export default Audio;
