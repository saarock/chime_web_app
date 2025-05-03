//  User interface type to user details
export interface User {
    id?: string,
    fullName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    profilePicture?: string,
    age?: string,
    gender?: string,
    relationShipStatus: boolean,
    active: boolean,
    country: string, 
    role: ["admin", "user"]
}


// User interface for login 
export interface UserLoginWithGoogleDetils {
    clientId: string,
    credentials: string,
}

// User interface for redux-auth-state
export interface UserAuthState {
    user: User | null,
    isAuthenticated: boolean,
    isError: boolean,
    errorMessage: string,
}