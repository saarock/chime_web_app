import { Users } from 'lucide-react'
import React from 'react'

interface VideoOnlineProps {
    onlineUsersCount: number
}
const VideoOnline: React.ComponentType<VideoOnlineProps> = (
    {
        onlineUsersCount,
    }
) => {
    return (
        <div className="chime-online-indicator">
            <span className="chime-online-dot"></span>
            <span className="chime-online-count">
                <Users size={14} />
                {onlineUsersCount} online
            </span>
        </div>
    )
}

export default VideoOnline