// Import all the necessary dependencies here
import { Users } from 'lucide-react'
import React from 'react'
import { VideoOnlineProps } from '../../types'


/**
 * 
 * @param {number} param0.onlineUsersCount - Hold the number of that how many users are there online now
 * @returns {React.FC}
 */
const VideoOnline: React.FC<VideoOnlineProps> = (
    {
        onlineUsersCount,
    }
) => {
    return (
        <div className="chime-online-indicator">
            <span className="chime-online-dot"></span>
            <span className="chime-online-count">
                <Users size={14} />
                {onlineUsersCount === 0
                    ? "Loading... If the number doesn’t appear within 3 seconds, please reload the app."
                    : `${onlineUsersCount} online`}

            </span>
        </div>
    )
}

export default VideoOnline