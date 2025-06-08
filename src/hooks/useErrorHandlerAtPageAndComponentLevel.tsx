import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ErrorState } from '../types';

const useErrorHandlerAtPageAndComponentLevel = () => {

  const [errorFallBack, setErrorMessageFallBack] = useState<ErrorState | null>();

  useEffect(() => {
    if (!errorFallBack) return;
    toast.error(errorFallBack.message);
  }, [errorFallBack]);


  return {setErrorMessageFallBack}

}

export default useErrorHandlerAtPageAndComponentLevel