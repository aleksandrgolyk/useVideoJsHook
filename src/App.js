import "video.js/dist/video-js.min.css";
import videojs from "video.js";
import RecordRTC from "recordrtc";
import "videojs-record/dist/css/videojs.record.css";
import "videojs-record/dist/videojs.record.js";
import "./styles.css";
import {useEffect, useRef, useState} from "react";
import Context from "./context/Context";

const screenDimensions = {
  // width: { min: 320, ideal: 640, max: 1080 },
  width: { min: 320, ideal: 640, max: 1080 },
  height: { min: 240, ideal: 480, max: 720 }
}
function options({audio, video, screen, image}) {
  return {
    controls: true,
    bigPlayButton: false,
    width: 1920,
    height: 1080,
    fluid: false,
    plugins: {
      record: {
        audio: audio,
        video: video ? screenDimensions : true,
        screen: screen ? screenDimensions : false,
        image: image ? screenDimensions : false,
        maxLength: 2 * 60 * 60,
        displayMilliseconds: false,
        // fire the timestamp event every 5 seconds
        timeSlice: 2000
      }
    }
  }
};

export default function App() {
  let value = {options}
  console.log(value.options);
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(true);
  const [screen, setScreen] = useState(false);
  const [image, setImage] = useState(false);

  function toggleImage() {
    setImage(true);
    setAudio(false);
    setVideo(false);
    setScreen(false);
    console.log(toggleImage);
  }

  function toggleAudio() {
    setImage(false);
    setAudio(true);
    setVideo(false);
    setScreen(false);
    console.log(toggleAudio);
  }

  function toggleVideo() {
    setImage(false);
    setAudio(true);
    setVideo(true);
    setScreen(false);
    console.log(toggleVideo);
  }

  function toggleScreen() {
    setImage(false);
    setAudio(true);
    setVideo(false);
    setScreen(true);
    console.log(toggleScreen);
  }


  const inputDeviceIdIndex = useRef(0);
  console.log('options before UE',value.options);
  useEffect(() => {
    var player = videojs("myVideo", value.options({audio, video, screen, image}), function () {
      console.log('options after UE',value.options.plugins.record);


    });

    // Helpers


    function setDeviceId(deviceId) {
      player.record().setVideoInput(deviceId);
    }

    // Handlers

    // enumerate devices once
    player.one("deviceReady", function () {
      player.record().enumerateDevices();
    });

    player.on("enumerateReady", function () {
      const devices = player.record().devices;

      // Filter out video input devices
      const videoInputDevices = devices.filter(
          ({kind}) => kind === "videoinput");

      // change video input device


    });

    // error handling
    player.on("deviceError", function () {
      console.log("device error:", player.deviceErrorCode);
    });

    player.on("error", function (element, error) {
      console.error(error);
    });

    // user clicked the record button and started recording
    player.on("startRecord", function () {
      console.log("started recording!");
    });

    // user completed recording
    player.on("finishRecord", async function () {
      console.log("finished recording");
      console.log({stream: player.recordedData});
    });

    // monitor stream data during recording
    player.on("timestamp", function () {

    });
  }, []);

  return (
      <Context.Provider value={value}>
        <div className="App">
          <div>
            <video id="myVideo" playsInline className="video-js vjs-default-skin"/>
            <button onClick={toggleScreen}>Screen</button>
          </div>
        </div>
      </Context.Provider>
  );
}
