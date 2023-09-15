import React, { useRef } from 'react';

function CustomAudioPlayer(src) {
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <audio ref={audioRef} src={src}></audio>
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
      {/* Add more custom controls as needed */}
    </div>
  );
}

export default CustomAudioPlayer;
