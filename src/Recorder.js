import 'video.js/dist/video-js.min.css'
import videojs from 'video.js'
// import RecordRTC from 'recordrtc'
import 'videojs-record/dist/css/videojs.record.css'
import 'videojs-record/dist/videojs.record.js'
import useVideoJS from "./useVideoJS";
import {useState} from "react";


const MyRecorder = () => {
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(true);
  const [screen, setScreen] = useState(false);
  const [image, setImage] = useState(false);
  const screenDimensions = {
    width: { min: 320, ideal: 640, max: 1080 },
    height: { min: 240, ideal: 480, max: 720 }
  }
  const {Video} = useVideoJS({

    controls: true,
    bigPlayButton: false,
    width: 800,
    height: 600,
    // fluid:true,
    autoplay: true,
    plugins: {
      record: {
        audio: audio,
        video: video ? screenDimensions : false,
        screen: screen ? screenDimensions : false,
        image: image ? screenDimensions : false,
        // video: video,
        // screen: screen,
        // image: image,
        maxLength: 30, //set video record duration in sec.
        displayMilliseconds: false,
        timeSlice: 5000,
        pip: true,
        debug: true
      }
    }
  })

  function toggleScreen() {
    setImage(false);
    setAudio(true);
    setVideo(false);
    setScreen(true);
    console.log(toggleScreen);
  }
  function toggleVideo() {
    setImage(false);
    setAudio(true);
    setVideo(true);
    setScreen(false);
    console.log(toggleScreen);
  }
  return (
      <>
        <Video playsInline  />
        <button onClick={toggleScreen}>screen</button>
        <button onClick={toggleVideo}>video</button>
      </>
  )
}
export default MyRecorder
