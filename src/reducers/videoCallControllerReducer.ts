// Import all the necessary dependencies here
import { CallAction, CallState } from "../types";



export function CallReducer(state: CallState, action: CallAction) {
  switch (action.type) {
    case "TOGGLE_VIDEO":
      return { ...state, isVideoEnabled: !state.isVideoEnabled };
    case "TOGGLE_AUDIO":
      return { ...state, isAudioEnabled: !state.isAudioEnabled };
    case "SET_IN_CALL":
      return { ...state, isInCall: action.payload };
    case "SET_CONNECTING":
      return { ...state, isConnecting: action.payload };
    case "TOGGLE_MAXIMIZED":
      return { ...state, isMaximized: !state.isMaximized };
    case "SET_ZOOM":
      return { ...state, zoomLevel: action.payload };
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    case "TOGGLE_FULLSCREEN":
      return { ...state, isFullScreen: !state.isFullScreen };
    case "REMOTE_AUDIO":
      return { ...state, isRemoteAudioEnable: action.payload }
    case "REMOTE_VIDEO":
      return { ...state, isRemoteVideoEnable: action.payload }
    default:
      return state;
  }
}
