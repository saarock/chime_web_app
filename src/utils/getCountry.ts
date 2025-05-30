class GetCountry {
  private async getCountryFromCoords(lat: number, lon: number): Promise<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch country data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (data && data.address && data.address.country) {
        return data.address.country;
      } else {
        return null; // No country found in response
      }
    } catch (error) {
      // Forward fetch or parsing error message
      throw new Error(`Error fetching country info: ${(error as Error).message}`);
    }
  }

  scanAndGet(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        // Geolocation API not supported by browser
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const country = await this.getCountryFromCoords(lat, lon);
            resolve(country);
          } catch (err) {
            reject(err instanceof Error ? err.message : String(err));
          }
        },
        error => {
          // Handle geolocation errors explicitly
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              reject('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              reject('The request to get user location timed out.');
              break;
            default:
              reject('An unknown geolocation error occurred.');
              break;
          }
        }
      );
    });
  }
}

const getCountry = new GetCountry();
export default getCountry;
