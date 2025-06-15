// Import React's useEffect hook to handle side effects
import { useEffect } from 'react';
// Import useSound hook from the 'use-sound' library to play audio files easily
import useSound from 'use-sound';

/**
 * SuccessSound Component
 * ----------------------
 * This React functional component plays a success sound effect whenever
 * the 'play' prop changes to true.
 * 
 * Props:
 * - play (boolean): When set to true, triggers the success sound to play.
 * 
 * Usage:
 * <SuccessSound play={true} />
 * 
 * Notes:
 * - The component does not render any visible UI (returns null).
 * - It uses the 'useSound' hook to load and play the audio located at '/sounds/success.wav'.
 * - The effect hook listens to changes in 'play' prop and calls 'playSound' accordingly.
 */
const SuccessSound = ({ play }: { play: boolean }) => {
  // Destructure the playSound function from the useSound hook
  // Provide the path to the success sound audio file (adjust path as needed)
  const [playSound] = useSound('/sounds/success.wav', {preload: true});

  alert('running')
 
  // useEffect runs side effects when dependencies change
  useEffect(() => {
    // If play prop is true, trigger the sound playback
    if (play) {
      playSound();
    }
    // Dependency array ensures this effect runs whenever 'play' or 'playSound' changes
  }, [play, playSound]);

  // Return null because this component doesn't render any visual elements
  return null;
};

export default SuccessSound;
