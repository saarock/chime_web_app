import { UserAuthState } from "../UserTypes/user";

// Create and export here all the interface types that are needed to get the states from the redux by using the useSelector
export interface RootState {
  auth: UserAuthState;
}
