/**
 * VideoProgressDots component
 * Renders a series of animated dots indicating video progress or loading state.
 * Each dot has a staggered animation delay for a sequential effect.
 */
const VideoProgressDots = () => {
    return (
        <div className="chime-progress-dots">
            {[0, 1, 2, 3].map((dot) => (
                <div
                    key={dot}
                    className="chime-progress-dot"
                    style={{ animationDelay: `${dot * 0.2}s` }} // Stagger animation delay for each dot
                />
            ))}
        </div>
    );
}

export default VideoProgressDots;
