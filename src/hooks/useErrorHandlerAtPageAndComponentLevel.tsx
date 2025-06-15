
// Import all the necessary dependencies here
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


/**
 * This hook is responsible for error handleing and show the toast from the catch block
 * @returns {set Function}
 */
const useErrorHandlerAtPageAndComponentLevel = () => {

  const [errorFallBack, setErrorMessageFallBack] = useState<any | null>();

  useEffect(() => {
    if (!errorFallBack) return;
    toast.error(errorFallBack.message);
  }, [errorFallBack]);


  return { setErrorMessageFallBack }

}

export default useErrorHandlerAtPageAndComponentLevel