// Import all the necessary dependencies from Redux Toolkit and types
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthResponseData,
  ErrorState,
  UserAuthState,
  UserImpDetails,
  UserLoginWithGoogleDetials,
} from "../../types";
import { AuthService, userService } from "../../services";
import { ApiError, AuthUtil, cookieUtil, localStorageUtil } from "../../utils";
import {
  ACCESS_TOKEN_KEY_NAME,
  LOCAL_STORAGE_USER_DATA_KEY,
  REFRESH_TOKEN_KEY_NAME,
} from "../../constant";
import { error } from "console";


// Create an asyncThunk for handling user login asynchronously
export const serverLoginWithGoogle = createAsyncThunk(
  "login-user", // Action type name
  async (userDetails: UserLoginWithGoogleDetials, thunkAPI) => {
    try {

      const userData: AuthResponseData =
        await AuthService.loginWithGoogle(userDetails);
      // saved the data and cookie in the localstorage and cookie
      localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, userData.data);

      // SET THE COOKIES
      cookieUtil.set(ACCESS_TOKEN_KEY_NAME, userData.data.accessToken);
      cookieUtil.set(REFRESH_TOKEN_KEY_NAME, userData.data.refreshToken);

      // RETURN THE USERDATA;
      return userData.data.userData;
    } catch (error) {
      if (error instanceof ApiError) {

        // Pass structured error info to the rejected action
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      // fallback generic error
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  },
);

// logout user
export const logoutUserFromServer = createAsyncThunk(
  "logout-user",
  async (userId: string, thunkAPI) => {
    try {
      await AuthService.logoutUser(userId);
      AuthUtil.clientSideLogout();
    } catch (error) {
      if (error instanceof ApiError) {

        // Pass structured error info to the rejected action
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      // fallback generic error
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  },
);


// Verify user is valid or not 

export const verifyUserFromTheServer = createAsyncThunk(
  "verify-user",
  async (_, thunkAPI) => {
    try {
      const axiosResponseData =
        await AuthService.verifyTokenOnEveryPageAndGetUserData();

      if (!axiosResponseData.data.userData) {
        throw new ApiError("Failed to verified the user.");
      }

      // set the data in the localstorage
      localStorageUtil.setItems(
        LOCAL_STORAGE_USER_DATA_KEY,
        axiosResponseData.data.userData,
      );
      return axiosResponseData.data.userData;

    } catch (error) {
      if (error instanceof ApiError) {
        // Pass structured error info to the rejected action
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      // fallback generic error
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  }
)




// Add the details country, age gender etc
export const addImportantDetails = createAsyncThunk(
  "user/addImportantDetails",
  async (userImpDetails: UserImpDetails, thunkAPI) => {
    try {
      const userImportantData = await userService.addUserImportantData(userImpDetails);
      if (!userImportantData) {
        return thunkAPI.rejectWithValue("Failed to add user important details");
      }
      return userImportantData.data;
    } catch (error) {
      if (error instanceof ApiError) {

        // Pass structured error info to the rejected action
        return thunkAPI.rejectWithValue({ message: error.message, statusCode: error.statusCode });
      }
      // fallback generic error
      return thunkAPI.rejectWithValue({ message: "Unknown error occurred" });
    }
  }
);

// Define the initial state structure for user authentication
const initialState: UserAuthState = {
  user: null, // No user is authenticated initially
  isAuthenticated: false, // Authentication status is false initially
  error: null
};

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
      state.error = action.payload as ErrorState;
    },
    clearError: (state) => {
      state.error = null;
    }
  },

  // extraReducers are used to handle async actions, such as login
  extraReducers: (builder) => {
    builder
      .addCase(serverLoginWithGoogle.fulfilled, (state, action) => {
        // When the login is successful, update the authentication status to true
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(serverLoginWithGoogle.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthenticated = false;
        if (action.payload) {
          state.error = action.payload as ErrorState;
        } else {
          state.error = { message: action.error.message || "Unknown error" };
        }
      });

    builder.addCase(logoutUserFromServer.fulfilled, (state, _) => {
      state.isAuthenticated = false;
      state.user = null;
    }).addCase(logoutUserFromServer.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload as ErrorState;
      } else {
        state.error = { message: action.error.message || "Unknown error" };
      }
    })

    builder.addCase(addImportantDetails.fulfilled, (state, action) => {
      if (state.user) {
        state.user.country = action.payload.country;
        state.user.gender = action.payload.gender;
        state.user.age = Number(action.payload.age);
      }
    });

    builder.addCase(addImportantDetails.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload as ErrorState;
      } else {
        state.error = { message: action.error.message || "Unknown error" };
      }
    });

    builder.addCase(verifyUserFromTheServer.fulfilled, (_, action) => {
      userSlice.actions.login(action.payload);
    });
    builder.addCase(verifyUserFromTheServer.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload as ErrorState;
      } else {
        state.error = { message: action.error.message || "Unknown error" };
      }
    })
  },
});

// Export the reducer and actions
export const { login, logout, setError, clearError } = userSlice.actions;
export default userSlice.reducer;
