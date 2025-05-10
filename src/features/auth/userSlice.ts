// Import all the necessary dependencies from Redux Toolkit and types
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthResponseData, UserAuthState, UserLoginWithGoogleDetils } from '../../types'
import { AuthService } from '../../services'
import { cookieUtil, localStorageUtil } from '../../utils'
import { ACCESS_TOKEN_KEY_NAME, LOCAL_STORAGE_USER_DATA_KEY, REFRESH_TOKEN_KEY_NAME } from '../../constant'



// Create an asyncThunk for handling user login asynchronously
export const serverLoginWithGoogle = createAsyncThunk(
    'login-user', // Action type name
    async (userDetails: UserLoginWithGoogleDetils, thunkAPI) => {
        try {

            const userData: AuthResponseData = await AuthService.loginWithGoogle(userDetails);
            // saved the data and cookie in the localstorage and cookie
            localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, userData.data);

            // SET THE COOKIES
            cookieUtil.set(ACCESS_TOKEN_KEY_NAME, userData.data.accessToken);
            cookieUtil.set(REFRESH_TOKEN_KEY_NAME, userData.data.refreshToken);


            // RETURN THE USERDATA;
            return userData.data.userData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)



// Define the initial state structure for user authentication
const initialState: UserAuthState = {
    user: null, // No user is authenticated initially
    isAuthenticated: false, // Authentication status is false initially

}

// Create a Redux slice to handle user authentication actions and state updates
const userSlice = createSlice({
    name: "auth", // Name of the slice
    initialState, // Initial state of the authentication feature
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

    },

    // extraReducers are used to handle async actions, such as login
    extraReducers: (builder) => {
        builder.addCase(serverLoginWithGoogle.fulfilled, (state, action) => {
            // When the login is successful, update the authentication status to true
            state.isAuthenticated = true;
            state.user = action.payload;
        }).addCase(serverLoginWithGoogle.rejected, (state, action) => {
            // handel asyn error
        });
    }
})

// Export the reducer and actions 
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
