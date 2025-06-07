export type Layout = "side-by-side" | "focus-remote";

export interface CallState {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isInCall: boolean;
  isConnecting: boolean;
  isMaximized: boolean;
  zoomLevel: number;
  layout: Layout;
  isFullScreen: boolean;
  isRemoteAudioEnable: boolean;
  isRemoteVideoEnable: boolean;
  retryNumber: number;
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
  isRemoteAudioEnable: true,
  isRemoteVideoEnable: true,
  retryNumber: 0,
};


export type CallAction =
  | { type: "TOGGLE_VIDEO" }
  | { type: "TOGGLE_AUDIO" }
  | { type: "SET_IN_CALL"; payload: boolean }
  | { type: "SET_CONNECTING"; payload: boolean }
  | { type: "TOGGLE_MAXIMIZED" }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SET_LAYOUT"; payload: Layout }
  | { type: "TOGGLE_FULLSCREEN" }
  | { type: "REMOTE_AUDIO", payload: boolean }
  | { type: "REMOTE_VIDEO", payload: boolean }
  | { type: "INCREMENT_RETRY" }
  | { type: "RESET_RETRY"};




export interface VideoCallState {
  // Media & Signaling
  isVideoSocketConnected: boolean;
  isPartnerCallEnded: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  onlineUsersCount: number;
  partnerId: string | null;

  // UI & Call Controls
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isInCall: boolean;
  isConnecting: boolean;
  isMaximized: boolean;
  zoomLevel: number;
  layout: Layout
  isFullScreen: boolean;
  isRemoteAudioEnable: boolean;
  isRemoteVideoEnable: boolean;
  retryNumber: number;
}


