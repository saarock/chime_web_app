type Layout = "side-by-side" | "focus-remote";

export interface CallState {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isInCall: boolean;
  isConnecting: boolean;
  isMaximized: boolean;
  zoomLevel: number;
  layout: Layout;
  isFullScreen: boolean;
}

export const videoInitialState: CallState = {
  isVideoEnabled: true,
  isAudioEnabled: true,
  isInCall: false,
  isConnecting: false,
  isMaximized: false,
  zoomLevel: 1,
  layout: "side-by-side",
  isFullScreen: false,
};

type CallAction =
  | { type: "TOGGLE_VIDEO" }
  | { type: "TOGGLE_AUDIO" }
  | { type: "SET_IN_CALL"; payload: boolean }
  | { type: "SET_CONNECTING"; payload: boolean }
  | { type: "TOGGLE_MAXIMIZED" }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SET_LAYOUT"; payload: Layout }
  | { type: "TOGGLE_FULLSCREEN" };

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
    default:
      return state;
  }
}
