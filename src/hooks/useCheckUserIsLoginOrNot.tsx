// useCheckUserIsLoginOrNot.ts
// Import all the necessary dependencies here
import { useEffect } from "react";
import { AuthService } from "../services";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/userSlice";


/**
 * 🪝 useCheckUserIsLoginOrNot
 *
 * This hook runs once on mount to:
 * - Check if the user is already logged in via token/cookie
 * - If valid, fetches user info from backend
 * - Updates Redux auth state accordingly
 *
 * ✅ This ensures that session is restored on page reload (especially important in web apps)
 * ❌ It ignores any error silently — you don't want to throw on public pages
 */
const useCheckUserIsLoginOrNot = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await AuthService.verifyTokenOnEveryPageAndGetUserData();
        dispatch(login(response.data.userData)); // ✅ Set user in Redux store
      } catch (error) {
        // ❌ Ignore errors for non-protected pages
      }
    })();
  }, []);
};

export default useCheckUserIsLoginOrNot;
