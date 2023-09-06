import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

function Recorder() {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  return (
    <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        downloadOnSavePress={true}
        downloadFileExtension="wav"
        showVisualizer={true}
      />
  );
}

export default Recorder;