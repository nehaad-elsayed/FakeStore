import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="error-subtitle">
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            Go Back
          </button>
        </div>

        <div className="helpful-links">
          <p>You might also want to check out:</p>
          <div className="links-grid">
            <Link to="/products" className="helpful-link">
              Products
            </Link>
            <Link to="/contact" className="helpful-link">
              Contact
            </Link>
            <Link to="/user-data" className="helpful-link">
              User Data
            </Link>
          </div>
        </div>
      </div>

      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
    </div>
  );
}
