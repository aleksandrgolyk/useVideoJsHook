import * as React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
// const useVideoJS = (videoJsOptions: any) => {



const useVideoJS = (videoJsOptions) => {
  const videoNode = React.useRef(null)
  // const player = React.useRef<any>(null)
  const player = React.useRef(null)
  React.useEffect(() => {
    player.current = videojs(videoNode.current, videoJsOptions,function (){})
    return () => {
            player.current.dispose()
          }
  }, [videoJsOptions.plugins.record.screen])
  const Video = React.useCallback(
      ({children, ...props}) => {
        return (
            <div>
              <video ref={videoNode} className="video-js vjs-default-skin" {...props}>
                {children}
              </video>
            </div>
        )
      },
      [videoJsOptions.plugins.record.screen],
  )
  return {Video, player: player.current}
}
export default useVideoJS
