// Import all the necessary dependencies from Redux Toolkit and types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthResponseData,
  ErrorState,
  UserAuthState,
  UserImpDetails,
  UserLoginWithGoogleDetials,
} from "../../types"; // Import the necessary types for user data
import { AuthService, userService } from "../../services"; // Import services for authentication and user data
import { ApiError, AuthUtil, cookieUtil, localStorageUtil } from "../../utils"; // Utility functions for handling cookies, local storage, and errors
import {
  ACCESS_TOKEN_KEY_NAME,
  LOCAL_STORAGE_USER_DATA_KEY,
  REFRESH_TOKEN_KEY_NAME,
} from "../../constant"; // Constant keys for local storage and cookies


// Create an asyncThunk for handling user login asynchronously
export const serverLoginWithGoogle = createAsyncThunk(
  "login-user", // Action type name for the login process
  async (userDetails: UserLoginWithGoogleDetials, thunkAPI) => {
    try {
      // Call the login API with Google details
      const userData: AuthResponseData = await AuthService.loginWithGoogle(userDetails);

      // Save the user data to local storage
      localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, userData.data);

      // Set access and refresh tokens in cookies
      // cookieUtil.set(ACCESS_TOKEN_KEY_NAME, userData.data.accessToken);
      // cookieUtil.set(REFRESH_TOKEN_KEY_NAME, userData.data.refreshToken);

      // Return user data on successful login
      return userData.data.userData;
    } catch (error) {
      // Handle errors: structured error response using thunkAPI
      if (error instanceof ApiError) {
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      // Generic error handling fallback
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  },
);

// Logout the user from the server
export const logoutUserFromServer = createAsyncThunk(
  "logout-user", // Action type for logout
  async (userId: string, thunkAPI) => {
    try {
      // Call the logout service
      await AuthService.logoutUser(userId);

      // Perform client-side logout actions (clear cookies, local storage, etc.)
      AuthUtil.clientSideLogout();
    } catch (error) {
      // Handle errors similarly
      if (error instanceof ApiError) {
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  },
);

// Verify the user's token on every page load to ensure they are still authenticated
export const verifyUserFromTheServer = createAsyncThunk(
  "verify-user", // Action type for verification
  async (_, thunkAPI) => {
    try {
      // Verify token and get user data from server
      const axiosResponseData = await AuthService.verifyTokenOnEveryPageAndGetUserData();

      // Store verified user data in local storage
      localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, axiosResponseData.data.userData);

      // Return user data for further use
      return axiosResponseData.data.userData;

    } catch (error) {
      console.log(error);
      
      // Handle errors similarly as before
      if (error instanceof ApiError) {
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  }
)

// Add important details like country, age, gender for the user
export const addImportantDetails = createAsyncThunk(
  "user/addImportantDetails", // Action type for adding important details
  async (userImpDetails: UserImpDetails, thunkAPI) => {
    try {
      // Call the service to add important details for the user
      const userImportantData = await userService.addUserImportantData(userImpDetails);

      // If no data returned, reject the action
      if (!userImportantData) {
        return thunkAPI.rejectWithValue("Failed to add user important details");
      }

      return userImportantData.data; // Return the added data
    } catch (error) {
      // Handle errors
      if (error instanceof ApiError) {
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  }
);

// Define the initial state structure for user authentication
const initialState: UserAuthState = {
  user: null, // User data starts as null (not authenticated)
  isAuthenticated: false, // Authentication status initially false
  error: null, // No errors initially
  isLoading: false, // No loading initially
};

// Create a Redux slice to handle user authentication actions and state updates
const userSlice = createSlice({
  name: "auth", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to handle login action (sets user data and authentication state)
    login: (state, action) => {
      state.user = action.payload; // Set user data
      state.isAuthenticated = true; // Set authentication status to true
    },
    // Reducer to handle logout action (resets user state)
    logout: (state) => {
      state.user = null; // Remove user data
      state.isAuthenticated = false; // Set authentication status to false
    },
    // Reducer to set error information
    setError: (state, action) => {
      state.error = action.payload as ErrorState; // Set error message
    },
    // Reducer to clear error information
    clearError: (state) => {
      state.error = null; // Reset error state
    },
    // Reducers to handle loading state (for async actions)
    setLoadingTrue: (state) => {
      state.isLoading = true; // Set loading state to true
    },
    setLoadingFalse: (state) => {
      state.isLoading = false; // Set loading state to false
    }
  },

  // Handling async actions in extraReducers
  extraReducers: (builder) => {
    builder
      // Server login action (sets loading and handles success/error)
      .addCase(serverLoginWithGoogle.pending, (state) => {
        state.isLoading = true; // Set loading state to true
      })
      .addCase(serverLoginWithGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authenticated state to true
        state.user = action.payload; // Set user data from action payload
        state.isLoading = false; // Set loading state to false
      })
      .addCase(serverLoginWithGoogle.rejected, (state, action) => {
        state.isAuthenticated = false; // Reset authenticated state
        state.user = null; // Reset user data
        state.isLoading = false; // Reset loading state
        if (action.payload) {
          state.error = action.payload as ErrorState; // Set error message if available
        } else {
          state.error = { message: action.error.message || "Unknown error" }; // Generic error message
        }
      })

      // Logout action (clears user data and sets loading)
      .addCase(logoutUserFromServer.pending, (state) => {
        state.isLoading = true; // Set loading state to true
      })
      .addCase(logoutUserFromServer.fulfilled, (state) => {
        state.isAuthenticated = false; // Set authenticated state to false
        state.user = null; // Clear user data
        state.isLoading = false; // Set loading state to false
      })
      .addCase(logoutUserFromServer.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false
        if (action.payload) {
          state.error = action.payload as ErrorState; // Set error if any
        } else {
          state.error = { message: action.error.message || "Unknown error" }; // Generic error message
        }
      })

    builder.addCase(addImportantDetails.pending, () => {

    }).addCase(addImportantDetails.fulfilled, (state, action) => {
      if (state.user) {
        state.user.country = action.payload.country; // set the country when user change the imp details
        state.user.gender = action.payload.gender; // set the gender when user change the imp details
        state.user.age = Number(action.payload.age); // set the age when user change the imp details
      }
    }).addCase(addImportantDetails.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload as ErrorState; // Set the error as ErrorState
      } else { 
        state.error = { message: action.error.message || "Unknown error" }; // Generic error message
      }
    });

    builder.addCase(verifyUserFromTheServer.pending, (state, _) => {
      state.isLoading = true;
    }).addCase(verifyUserFromTheServer.fulfilled, (state, action) => {
      state.user = action.payload; // Set user data
      state.isAuthenticated = true; // Set authentication status to true
      state.isLoading = false; // Set the loading false

    }).addCase(verifyUserFromTheServer.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload as ErrorState; // Set the error as ErrorState
        state.isLoading = false;
      } else {
        state.error = { message: action.error.message || "Unknown error" }; // Generic error message
      }
    })
  },
});

// Export the reducer and actions
export const { login, logout, setError, clearError, setLoadingTrue, setLoadingFalse } = userSlice.actions;
export default userSlice.reducer;
