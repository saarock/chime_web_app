// Import React's useEffect hook for side effects
import { useEffect } from 'react';
// Import useSound hook from 'use-sound' library for easy sound playback
import useSound from 'use-sound';

/**
 * ErrorSound Component
 * --------------------
 * Plays an error sound effect when the 'play' prop is true.
 * 
 * Props:
 * - play (boolean): Controls when to play the error sound.
 * 
 * Usage:
 * <ErrorSound play={true} />
 * 
 * Notes:
 * - This component renders no visible UI (returns null).
 * - Uses 'useSound' hook with the audio file located at '/sounds/error.wav'.
 * - Triggers sound playback inside useEffect when 'play' changes to true.
 */
const ErrorSound = ({ play }: { play: boolean }) => {
  // Initialize playSound function with the error sound file path
  const [playSound] = useSound('/sounds/error.wav');

  // Run side effect to play sound when 'play' is true
  useEffect(() => {
    if (play) {
      playSound();
    }
  }, [play, playSound]);

  // No UI rendering needed for sound playing component
  return null;
};

export default ErrorSound;
