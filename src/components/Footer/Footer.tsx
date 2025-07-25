// Import all the necessary dependencies here
import React, { JSX } from "react";
import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "../../styles/components/Footer.css";
import { SimpleFooterProps } from "../../types";
import useSetting from "../../hooks/useSetting";

/**
 * @param {SimpleFooterProps}
 * @param {string} param0.companyName
 * @param {string} param0.companyDescription
 * @param {string} param0.socialLinks {param0.socialLinks.name, .url and .icon}
 * @returns
 *
 */
const Footer: React.ComponentType<SimpleFooterProps> = ({
  companyName = "Saarock",
  companyDescription = "Connect with people worldwide through safe and anonymous chats.",
  socialLinks = [
    {
      name: "Twitter",
      url: "https://x.com/saarock4646",
      icon: <FaTwitter />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aayush-basnet-885ab9267/",
      icon: <FaLinkedinIn />,
    },
    { name: "GitHub", url: "https://github.com/saarock", icon: <FaGithub /> },
  ],
}): JSX.Element => {
  const { isShowFooter } = useSetting();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {isShowFooter && (
        <footer className="chime-footer">
          <div className="chime-footer-container">
            <div className="chime-footer-brand">
              <h2 className="chime-footer-company">{companyName}</h2>
              <p className="chime-footer-description">{companyDescription}</p>
            </div>
            <div className="chime-footer-socials">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="chime-footer-social-link"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="chime-footer-bottom">
              <small>
                &copy; {currentYear} {companyName}. All rights reserved.
              </small>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
