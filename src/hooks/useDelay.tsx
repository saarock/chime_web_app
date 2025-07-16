import { useCallback } from "react";

const useDelay = () => {
  // Delay call back hook helps to prevent some time from the race-condition
  const delay = useCallback(
    async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );
  return { delay };
};

export default useDelay;
