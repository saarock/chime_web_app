// Import the useSound hook from the 'use-sound' library
import useSound from 'use-sound';

/**
 * useNotificationSounds Hook
 * ---------------------------
 * A custom React hook to manage playing and stopping notification sounds.
 *
 * Features:
 * - playSuccess(): Plays the success notification sound
 * - stopSuccess(): Stops the currently playing success sound
 * - playError(): Plays the error notification sound
 * - stopError(): Stops the currently playing error sound
 * - resetSounds(): Stops both success and error sounds
 *
 * Usage Example:
 * const { playSuccess, stopSuccess, playError, stopError, resetSounds } = useNotificationSounds();
 * playSuccess(); // Play success sound
 * stopSuccess(); // Stop success sound
 * resetSounds(); // Stop all sounds
 */
export function useNotificationSounds() {
  // Load the success sound with access to play and stop methods
  const [playSuccess, { stop: stopSuccess }] = useSound('/sounds/success.wav', {
    preload: true,
  });

  // Load the error sound with access to play and stop methods
  const [playError, { stop: stopError }] = useSound('/sounds/error.wav', {
    preload: true,
  });

  /**
   * resetSounds
   * ------------
   * Stops all currently playing notification sounds.
   * Useful when changing routes, resetting forms, or clearing UI feedback.
   */
  const resetSounds = () => {
    stopSuccess();
    stopError();
  };

  // Expose all play/stop functions for use in components
  return {
    playSuccess,
    stopSuccess,
    playError,
    stopError,
    resetSounds, // Return resetSounds for stopping all sounds together
  };
}
