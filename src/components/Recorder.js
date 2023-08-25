// import React from 'react';
// import MicRecorder from 'mic-recorder-to-mp3';

// const Mp3Recorder = new MicRecorder({ bitRate: 128 });

// class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       isRecording: false,
//       blobURL: '',
//       isBlocked: false,
//     };
//   }

//   start = () => {
//     if (this.state.isBlocked) {
//       console.log('Permission Denied');
//     } else {
//       Mp3Recorder
//         .start()
//         .then(() => {
//           this.setState({ isRecording: true });
//         }).catch((e) => console.error(e));
//     }
//   };

//   stop = () => {
//     Mp3Recorder
//       .stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         const blobURL = URL.createObjectURL(blob)
//         this.setState({ blobURL, isRecording: false });
//       }).catch((e) => console.log(e));
//   };

//   componentDidMount() {
//     navigator.getUserMedia({ audio: true },
//       () => {
//         console.log('Permission Granted');
//         this.setState({ isBlocked: false });
//       },
//       () => {
//         console.log('Permission Denied');
//         this.setState({ isBlocked: true })
//       },
//     );
//   }

//   render(){
//     return (
//       <div className="App">
//         <header className="App-header">
//           <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
//           <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
//           <audio src={this.state.blobURL} controls="controls" />
//         </header>
//       </div>
//     );
//   }
// }

// export default App;


import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

function Recorder({ setAudioDiv }) {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });
  const [isActive, setIsActive] = useState(false);

  const readFileData = () => {
    if (!mediaBlobUrl) return;

    // const reader = new FileReader();

    fetch(mediaBlobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const formData = new FormData();
        formData.append("data", blob, "myAudio.wav");
        formData.append("key", mediaBlobUrl);
        console.log(formData,blob,mediaBlobUrl,"j");
        upload(formData);
      });
  };
  const upload = async (formData) => {
console.log(formData,"gg");
  };
  useEffect(() => {
    if (mediaBlobUrl) {
      console.log(mediaBlobUrl,"mb");
      readFileData();
    }
  }, [mediaBlobUrl]);
  return (
    <div
      className={`${isActive ? "animate-ping" : ""} `}
      onClick={() => {
        if (!isActive) {
          startRecording();
        } else {
          stopRecording();
        }
        setIsActive(!isActive);
      }}
    >
      <div configuration="mic" size="large">rec</div>
    </div>
  );
}

export default Recorder;