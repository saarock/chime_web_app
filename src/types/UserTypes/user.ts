//  User interface type to user details
type userRole = "admin" | "user"
export interface User {
  _id: string;
  fullName: string;
  userName?: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  age?: number;
  gender?: string;
  relationShipStatus?: string;
  active: boolean;
  country?: string;
  role: userRole;
  __v?: number;
  password?: string;
}

// User interface for login
export interface UserLoginWithGoogleDetials {
  clientId: string;
  credential: string;
}

// Error state

export interface ErrorState {
  message: string;
  statusCode?: number;       // optional error code, if available
  details?: any;       // optional extra info, e.g. validation errors
}


// User interface for redux-auth-state
export interface UserAuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: ErrorState | null;
  isLoading?: boolean;
}

// User response interface
interface userDataWithRefreshAnAccessToken {
  refreshToken: string;
  accessToken: string;
  userData: User;
}

// Interface for the data field inside the response
export interface AuthResponseData {
  user(user: any): unknown;
  refreshToken(refreshToken: any): unknown;
  accessToken(accessToken: any): unknown;
  data: userDataWithRefreshAnAccessToken;
  statusCode: number;
  message: string;

}

export interface UserVideoFilter {
  age: string;
  country: string;
  gender: string;
  isStrict: boolean;
}
export interface UserVideoFilterFromProps {
  age: string;
  country: string;
  gender: string;
  isStrict: string;
}





// User data interface types while veryfying user and getting new refresh data

export interface UserData {
  userData: User;
}


export interface UserImpDetails {
  age?: number;
  country?: string;
  gender?: string;
  phoneNumber?: string | null;
  relationshipStatus?: string | null;
  userName?: string;
}

// Like dislike user report type
export type ReportTypes = "like" | "dislike"
export interface Report {
  reportedUserId: string;
  type: ReportTypes
};
