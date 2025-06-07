//  User interface type to user details
export interface User {
  _id: string;
  fullName: string;
  userName?: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  age?: number;
  gender?: string;
  relationShipStatus?: boolean;
  active: boolean;
  country?: string;
  role: ["admin", "user"];
  __v?: number;
}

// User interface for login
export interface UserLoginWithGoogleDetials {
  clientId: string;
  credential: string;
}

// User interface for redux-auth-state
export interface UserAuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// User response interface
interface userDataWithRefreshAnAccessToken {
  refreshToken: string;
  accessToken: string;
  userData: User;
}

// Interface for the data field inside the response
export interface AuthResponseData {
  data: userDataWithRefreshAnAccessToken;
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
  age: number;
  country: string;
  gender: string;
  userId: string;
}