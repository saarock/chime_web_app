import React from "react"

/**
 * This is the simple component to show the title only 
 * @returns {React.FC}
 */
const Title: React.FC = () => {
    return (
        <h1 className="chime-video-title-heading">
            <span className="chime-title-emoji">🎥</span>
            Random Video Chat
        </h1>
    )
}

export default Title