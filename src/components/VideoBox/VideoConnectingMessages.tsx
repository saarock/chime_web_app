// Import all the necessary dependencies here
import React from 'react'
import { VideoConnectingMessagesProps } from '../../types'


/**
 * VideoConnectingMessages component
 * Displays a message and the name of the peer during video connection setup.
 */
const VideoConnectingMessages: React.FC<VideoConnectingMessagesProps> = (
    {
        currentMessage,
        connectedTo,
    }
) => {
    return (
        <div className="chime-connecting-message">
            <p className="chime-message-text">{currentMessage}</p>
            <h2 className="chime-overlay-title">
                <span className="chime-overlay-username">{connectedTo}</span>
            </h2>
        </div>
    )
}

export default VideoConnectingMessages