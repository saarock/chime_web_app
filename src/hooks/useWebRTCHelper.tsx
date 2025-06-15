// Import all the necessary dependencies here
import { useRef } from 'react'



const useWebRTCHelper = () => {

    // Store the current partner’s userId for signaling
    const partnerIdRef = useRef<string | null>(null);


    //  Just leave for the future use-case
    // const userVideoFilter = useSelector((state: UserReduxRootState) => state.videoFilters);

    const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);



    return {
        partnerIdRef,
        pendingCandidatesRef,
    }
}

export default useWebRTCHelper