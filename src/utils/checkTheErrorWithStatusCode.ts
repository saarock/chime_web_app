import axios, { AxiosError } from "axios";

class CheckTheErrorWithTheStatusCode {
  checkTheStatusCode(error: AxiosError): number | undefined {
    return error?.response?.status;
  }
  isAxiosError(error: unknown): AxiosError | null {
    if (axios.isAxiosError(error)) {
      return error;
    } else {
      return null;
    }
  }
}

const checkTheErrorWithTheStatusCode = new CheckTheErrorWithTheStatusCode();
export default checkTheErrorWithTheStatusCode;
