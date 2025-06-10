import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useErrorHandlerAtPageAndComponentLevel = () => {

  const [errorFallBack, setErrorMessageFallBack] = useState<any | null>();

  useEffect(() => {
    if (!errorFallBack) return;
    toast.error(errorFallBack.message);
  }, [errorFallBack]);


  return {setErrorMessageFallBack}

}

export default useErrorHandlerAtPageAndComponentLevel