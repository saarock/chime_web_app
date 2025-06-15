// Import all the necessary dependencies here 
import React from 'react';
import { VideoFloatingAnimationParticlesProps } from '../../types';



/**
 * VideoFloatingAnimationParticles component
 * Renders floating animated particles based on the given coordinates and delay.
 */
const VideoFloatingAnimationParticles: React.FC<VideoFloatingAnimationParticlesProps> = ({
    particles
}) => {
    return (
        <div className="chime-particles-container">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="chime-particle"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default VideoFloatingAnimationParticles;
