// Import all the necessary dependencies here
import "../../../styles/pages/ContactUsPage.css";

const ContactPage = () => {
  return (
    <div className="chime-contact-container">
      <h1 className="chime-contact-title">Contact Us</h1>
      <p className="chime-contact-description">
        We'd love to hear from you. Please reach out using any of the methods below.
      </p>

      <div className="chime-contact-info">
        <p><strong>Email:</strong> contact@yourcompany.com</p>
        <p><strong>Phone:</strong> +977-9800000000</p>
        <p><strong>Address:</strong> Kathmandu, Nepal</p>
      </div>

      <div className="chime-contact-socials">
        <p><strong>Follow us:</strong></p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <span> | </span>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <span> | </span>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </div>
  );
};

export default ContactPage;
