
import { Link } from "react-router"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "../../components"
import "../../styles/pages/NotFound.css";


export default function NotFound() {
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
                        <Button className="chime-btn chime-btn-home">
                            <Home className="chime-icon" />
                            <span>Home</span>
                        </Button>
                    </Link>

                    <Button onClick={() => window.history.back()} className="chime-btn chime-btn-back">
                        <ArrowLeft className="chime-icon" />
                        <span>Go Back</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
