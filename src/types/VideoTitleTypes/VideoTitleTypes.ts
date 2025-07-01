export interface VideoTitleProps {
  errorMessage: string | null;
  successMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  onlineUsersCount: number;
  isInCall: boolean;
  userId: string;
  partnerId: string | null
}



export interface VideoOnlineProps {
    onlineUsersCount: number;  // Online user count reveived form the server via the socket

}