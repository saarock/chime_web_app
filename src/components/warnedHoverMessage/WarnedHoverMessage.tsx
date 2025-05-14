import React, { JSX } from "react";
import "../../styles/index";
import { FaLock } from "react-icons/fa";


/**
 * Chime search warned message if user hasnot update the important details after register
 * @returns 
 */
const WarnedHoverMessage: React.ComponentType = (): JSX.Element => {
  return (
    <div className="chime-hover-warned-message-container">
      <FaLock style={{ marginRight: '8px', color: '#d9534f' }} />
      <p>Please fulfill all the data before continuing. Visit your profile page and fulfill requried fields.</p>
    </div>
  );
};

export default WarnedHoverMessage;
