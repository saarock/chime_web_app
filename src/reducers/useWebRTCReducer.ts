// Types
type State = {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    errorMessage: string | null;
    successMessage: string | null;
    onlineUsersCount: number;
    isPartnerCallEnded: boolean;
    isVideoSocketConnected: boolean;
}

type Action =
    | { type: 'SET_LOCAL_STREAM'; payload: MediaStream | null }
    | { type: 'SET_REMOTE_STREAM'; payload: MediaStream | null }
    | { type: 'SET_ERROR_MESSAGE'; payload: string | null }
    | { type: 'SET_SUCCESS_MESSAGE'; payload: string | null }
    | { type: 'SET_ONLINE_USERS_COUNT'; payload: number }
    | { type: 'SET_PARTNER_CALL_ENDED'; payload: boolean }
    | { type: 'SET_VIDEO_SOCKET_CONNECTED'; payload: boolean }

// Initial State
const initialState: State = {
    localStream: null,
    remoteStream: null,
    errorMessage: null,
    successMessage: null,
    onlineUsersCount: 0,
    isPartnerCallEnded: false,
    isVideoSocketConnected: false,
}

// Reducer Function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_LOCAL_STREAM':
            return { ...state, localStream: action.payload }
        case 'SET_REMOTE_STREAM':
            return { ...state, remoteStream: action.payload }
        case 'SET_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload }
        case 'SET_SUCCESS_MESSAGE':
            return { ...state, successMessage: action.payload }
        case 'SET_ONLINE_USERS_COUNT':
            return { ...state, onlineUsersCount: action.payload }
        case 'SET_PARTNER_CALL_ENDED':
            return { ...state, isPartnerCallEnded: action.payload }
        case 'SET_VIDEO_SOCKET_CONNECTED':
            return { ...state, isVideoSocketConnected: action.payload }
        default:
            return state
    }
}

