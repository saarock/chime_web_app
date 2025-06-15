// Import all the necessary dependencies here 
import { UserAuthState } from "../../types";

// Define the initial state structure for user authentication
export const authInitialState: UserAuthState = {
  user: null, // User data starts as null (not authenticated)
  isAuthenticated: false, // Authentication status initially false
  error: null, // No errors initially
  isLoading: false, // No loading initially
};