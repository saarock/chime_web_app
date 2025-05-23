import "../../styles/index";
import { FaLock } from "react-icons/fa";

const WarnedHoverMessage = () => {
  return (
    <div className="chime-hover-warned-message-container">
      <FaLock style={{ marginRight: '8px', color: '#d9534f' }} />
      <p>Please fulfill all the data before continuing</p>
    </div>
  );
};

export default WarnedHoverMessage;
