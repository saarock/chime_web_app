import React from 'react'
import { useVideoSocket } from '../../../hooks'

const VideoCallPage = () => {
  // All the hooks goes here
  useVideoSocket() // initialize the video socket on video page only
  return (
    <div>VideoCallPage</div>
  )
}

export default VideoCallPage