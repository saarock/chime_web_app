// Import all the necessary dependencies here
import React, { JSX } from "react";
import { ChimeSectionsHowHeaderProps } from "../../types";

/**
 * Chime headerSection for all the section components
 * @note - this component css is on [/styles/components/HowItWorks.css]
 * @param {ChimeSectionsHowHeaderProps}
 * @param {string} param0.title - Setion title
 * @param {string} param0.description - Setion description
 * @returns {JSX.Element}
 */
const ChimiSectionsHowHeader: React.ComponentType<
  ChimeSectionsHowHeaderProps
> = ({ title, description }): JSX.Element => {
  return (
    <div className="chime-how-header">
      <h2 className="chime-how-title">{title}</h2>
      <p className="chime-how-description">{description}</p>
    </div>
  );
};

export default ChimiSectionsHowHeader;
