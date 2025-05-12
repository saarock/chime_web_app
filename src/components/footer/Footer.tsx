import React from 'react';
import "../../styles/index";  // Assuming the CSS is included in this file

const Footer = () => {
  return (
    <footer className="chime-footer">
      <div className="chime-footer-content">
        <p className="chime-footer-text">© {new Date().getFullYear()} Chime. All rights reserved.</p>
        <div className="chime-footer-links">
          <a href="#" className="chime-footer-link">Privacy Policy</a>
          <a href="#" className="chime-footer-link">Terms of Service</a>
          <a href="#" className="chime-footer-link">Contact</a>
        </div>
        <div className="chime-footer-social">
          <a href="#" className="chime-footer-social-icon">Facebook</a>
          <a href="#" className="chime-footer-social-icon">Twitter</a>
          <a href="#" className="chime-footer-social-icon">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
