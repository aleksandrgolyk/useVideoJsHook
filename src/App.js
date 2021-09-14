import "video.js/dist/video-js.min.css";
import "videojs-record/dist/css/videojs.record.css";
import "videojs-record/dist/videojs.record.js";
import "./styles.css";
import MyRecorder from "./context/Recorder";



export default function App() {


  return (
        <div className="App">
            <MyRecorder />
        </div>
  );
}
