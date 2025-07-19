import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../lib/Routes";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="illustration">
          <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="100" r="80" fill="#F0F4FF" />
            <path
              d="M150 50C150 47.7909 151.791 46 154 46H186C188.209 46 190 47.7909 190 50V150C190 152.209 188.209 154 186 154H154C151.791 154 150 152.209 150 150V50Z"
              fill="#D6E4FF"
            />
            <rect
              x="110"
              y="50"
              width="40"
              height="104"
              rx="2"
              fill="#D6E4FF"
            />
            <path
              d="M150 70C150 67.7909 151.791 66 154 66H186C188.209 66 190 67.7909 190 70V130C190 132.209 188.209 134 186 134H154C151.791 134 150 132.209 150 130V70Z"
              fill="#F0F4FF"
            />
            <rect x="110" y="70" width="40" height="60" rx="2" fill="#F0F4FF" />
            <path
              d="M170 90C170 88.8954 170.895 88 172 88H178C179.105 88 180 88.8954 180 90V110C180 111.105 179.105 112 178 112H172C170.895 112 170 111.105 170 110V90Z"
              fill="#597EF7"
            />
            <path
              d="M130 90C130 88.8954 130.895 88 132 88H138C139.105 88 140 88.8954 140 90V110C140 111.105 139.105 112 138 112H132C130.895 112 130 111.105 130 110V90Z"
              fill="#597EF7"
            />
            <path d="M190 50L220 30V170L190 150V50Z" fill="#ADC6FF" />
            <path d="M90 50L60 30V170L90 150V50Z" fill="#ADC6FF" />
            <path d="M150 170L180 190L120 190L150 170Z" fill="#ADC6FF" />
            <text
              x="150"
              y="30"
              textAnchor="middle"
              fontSize="16"
              fill="#597EF7"
              fontWeight="bold"
            >
              404
            </text>
          </svg>
        </div>
        <h1 className="title">Page Not Found</h1>
        <p className="description">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button className="home-button" onClick={() => navigate("/")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="home-icon"
          >
            <path
              d="M14 16H2C0.89543 16 0 15.1046 0 14V7.00001C0 6.73479 0.105357 6.48044 0.292893 6.2929L7.29289 -0.707107C7.68342 -1.09763 8.31658 -1.09763 8.70711 -0.707107L15.7071 6.2929C15.8946 6.48044 16 6.73479 16 7.00001V14C16 15.1046 15.1046 16 14 16Z"
              fill="currentColor"
            />
          </svg>
          Go Back Home
        </button>
        <button
          className="home-button mt-2"
          onClick={() => navigate(APP_ROUTES.AUTH.FULL.LOGIN)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="login-icon"
          >
            <path
              d="M5 3H11C12.1046 3 13 3.89543 13 5V11C13 12.1046 12.1046 13 11 13H5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />
            <path
              d="M8 11L10 9L8 7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 9H3"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;
