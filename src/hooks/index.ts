// import all ncessary dependencies
import useAuth from "./useAuth";
import useVerifyTokenAndGetUserData from "./useVerifyTokenAndGetUserData";
import useChatSocket from "./useChatSocket";
import useVideoSocket from "./useVideoSocket";
import useWebRTC from "./useWebRTC";
import useWebRTCHelper from "./useWebRTCHelper";
import useErrorHandlerAtPageAndComponentLevel from "./useErrorHandlerAtPageAndComponentLevel";
import useLoading from "./useLoading";
import useError from "./useError";
import { useNotificationSounds } from "./useNotificationSounds";
import useCheckUserIsLoginOrNot from "./useCheckUserIsLoginOrNot";

// export hooks
export {
  useAuth,
  useVerifyTokenAndGetUserData,
  useChatSocket,
  useVideoSocket,
  useWebRTC,
  useWebRTCHelper,
  useErrorHandlerAtPageAndComponentLevel,
  useLoading,
  useError,
  useNotificationSounds,
  useCheckUserIsLoginOrNot,
};
