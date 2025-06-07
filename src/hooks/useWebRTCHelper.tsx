// Import all the necessary dependencies here
import { useRef, useState } from 'react'



const useWebRTCHelper = () => {
    // Hooks for the remote and local stream
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);


    // Errors in state
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Online users counts
    const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);

    // SuccessMessage in state
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [isPartnerCallEnded, setIsPartnerCallEnded] = useState(false);

    // Store the current partner’s userId for signaling
    const partnerIdRef = useRef<string | null>(null);

    const [isVideoSocketConnected, setIsVideoSocketConnected] = useState<boolean>(false);


    //  Just leave for the future use-case
    // const userVideoFilter = useSelector((state: UserReduxRootState) => state.videoFilters);

    const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);



    return {
        localStream,
        setLocalStream,
        remoteStream,
        setRemoteStream,
        errorMessage,
        setErrorMessage,
        onlineUsersCount,
        setOnlineUsersCount,
        successMessage,
        setSuccessMessage,
        isPartnerCallEnded,
        setIsPartnerCallEnded,
        partnerIdRef,
        isVideoSocketConnected,
        pendingCandidatesRef,
        setIsVideoSocketConnected
    }
}

export default useWebRTCHelper