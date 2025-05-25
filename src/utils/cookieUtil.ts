// cookieUtils.ts

class CookieUtil {
  // Set a cookie with optional expiration
  set(key: string, value: string, expiresInSeconds: number = 3600) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expiresInSeconds); // Set the expiration time
    document.cookie = `${key}=${value}; path=/; expires=${expires.toUTCString()}; secure; samesite=strict`;
  }

  // Get the cookie value by its name
  get(key: string): string | null {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (!decodedCookie || decodedCookie.trim() === "") {
      return null;
    }

    const cookies = decodedCookie.split(";"); // Split cookies by semicolon
    for (let cookie of cookies) {
      // Trim space before checking
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === key) {
        return cookieValue;
      }
    }

    return null;
  }

  // Clear a specific cookie
  clear(key: string) {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;
  }

  // Check if a cookie exists
  checkCookie(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Initialize the CookieUtil instance
const cookieUtil = new CookieUtil();
export default cookieUtil;
