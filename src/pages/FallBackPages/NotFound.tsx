
// Import all the dependencies here
import { Link, useNavigate } from "react-router"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "../../components"
import "../../styles/pages/NotFound.css";
import { Variant } from "../../types";

/**
 * FallBack component - NotFound.tsx page 
 * @returns {JSX.Element} - This page is the fallback page, show to the user when user want to vist the page that doesn't exist
 */
export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div className="chime-notfound-wrapper">
            <div className="chime-notfound-card">
                <h1 className="chime-notfound-title">404</h1>
                <h2 className="chime-notfound-subtitle">Page Not Found</h2>
                <p className="chime-notfound-message">
                    Sorry, the page you are looking for does not exist.
                </p>
                <div className="chime-notfound-buttons">
                    <Link to="/" className="chime-link-button">
                        <Button className="chime-btn chime-btn-home" variant={Variant.danger}>
                            <Home className="chime-icon" />
                            <span>Home</span>
                        </Button>
                    </Link>

                    <Button onClick={() => navigate(-1)} className="chime-btn chime-btn-back" variant={Variant.ternary}>
                        <ArrowLeft className="chime-icon" />
                        <span>Go Back</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
