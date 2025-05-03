// Import all the necessary dependencies from Redux Toolkit and types
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserAuthState, UserLoginWithGoogleDetils } from '../../../types'
import { AuthService } from '../../../services'



// Create an asyncThunk for handling user login asynchronously
export const serverLoginWithGoogle = createAsyncThunk(
    'login-user', // Action type name
    async (userDetails: UserLoginWithGoogleDetils, thunkAPI) => {
        try {
            alert(userDetails.credentials)
            const userData = await AuthService.login(userDetails);
            return userData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



// Define the initial state structure for user authentication
const initialState: UserAuthState = {
    user: null, // No user is authenticated initially
    isAuthenticated: false, // Authentication status is false initially
    isError: false,
    errorMessage: "",

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
        setError: (state, action) => {
            state.isError = true;
            state.errorMessage = JSON.stringify(action.payload);
        },
        clearError: (state) => {
            state.errorMessage = "";
            state.isError = false;
        }
    },

    // extraReducers are used to handle async actions, such as login
    extraReducers: (builder) => {
        builder.addCase(serverLoginWithGoogle.fulfilled, (state, action) => {
            // When the login is successful, update the authentication status to true
            state.isAuthenticated = true;
            state.user = action.payload.user;
        }).addCase(serverLoginWithGoogle.rejected, (state, action) => {
            state.isError = true;
            state.errorMessage = JSON.stringify(action.payload);
        })
    }
})

// Export the reducer and actions 
export const { login, logout, setError, clearError } = userSlice.actions;
export default userSlice.reducer;
