// Import all the necessary dependencies here 
import {
  ChimeRegisterLoginPageWrapper,
  LoginComponent,
} from "../../../components";
import "../../../styles/pages/LoginPage.css";


/**
 * The chime-app login page
 * @returns {React.JSX.Element}
 */
const LoginPage = () => {
  return (
    <ChimeRegisterLoginPageWrapper>
      <LoginComponent />
    </ChimeRegisterLoginPageWrapper>
  );
};

export default LoginPage;
