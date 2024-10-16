import { Link } from "react-router-dom";

import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="/johntravolta.gif"
        alt="image-gif"
        className="w-[700px] h-[400px]"
      />
      <p className="not-found-message">Oops! Sayfa bulunamadı.</p>
      <Link to="/" className="not-found-link">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
