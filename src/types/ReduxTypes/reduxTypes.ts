import { UserAuthState, UserVideoFilter } from "../UserTypes/user";
import { VideoCallState } from "../VideoCallPageTypes/videoCallPageTypes";


// Define the shape of the settings state
export interface Setting {
  showNavBar: boolean;
  showFooter: boolean;
}

// Create and export here all the interface types that are needed to get the states from the redux by using the useSelector
export interface RootState {
  auth: UserAuthState;
  videoCall: VideoCallState;
  videoFilters: UserVideoFilter;
  setting: Setting
}