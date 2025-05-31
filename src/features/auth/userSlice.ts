// Import all the necessary dependencies from Redux Toolkit and types
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthResponseData,
  UserAuthState,
  UserImpDetails,
  UserLoginWithGoogleDetials,
} from "../../types";
import { AuthService, userService } from "../../services";
import { AuthUtil, cookieUtil, localStorageUtil } from "../../utils";
import {
  ACCESS_TOKEN_KEY_NAME,
  LOCAL_STORAGE_USER_DATA_KEY,
  REFRESH_TOKEN_KEY_NAME,
} from "../../constant";

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
      console.log(error);

      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  },
);




// Add the details country, age gender etc
export const addImportantDetails = createAsyncThunk<
  UserImpDetails,                // ✅ Return type
  UserImpDetails,                // ✅ Argument type
  { rejectValue: string }        // ✅ Rejection payload type
>(
  "user/addImportantDetails",
  async (userImpDetails, thunkAPI) => {
    try {
      const userImportantData = await userService.addUserImportantData(userImpDetails);
      if (!userImportantData) {
        return thunkAPI.rejectWithValue("Failed to add user important details");
      }
      return userImportantData.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Define the initial state structure for user authentication
const initialState: UserAuthState = {
  user: null, // No user is authenticated initially
  isAuthenticated: false, // Authentication status is false initially
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
  },

  // extraReducers are used to handle async actions, such as login
  extraReducers: (builder) => {
    builder
      .addCase(serverLoginWithGoogle.fulfilled, (state, action) => {
        // When the login is successful, update the authentication status to true
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(serverLoginWithGoogle.rejected, (state, _) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    builder.addCase(logoutUserFromServer.fulfilled, (state, _) => {
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(addImportantDetails.fulfilled, (state, action) => {
      if (state.user) {
        state.user.country = action.payload.country;
        state.user.gender = action.payload.gender;
        state.user.age = Number(action.payload.age);
      }
    });

    builder.addCase(addImportantDetails.rejected, (_, action) => {
      console.log(action.error);
    });


  },
});

// Export the reducer and actions
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
