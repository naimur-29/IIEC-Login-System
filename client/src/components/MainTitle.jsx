import "../scss/mainTitle.scss";

// assets:
import MainLogo from "../assets/main-logo.png";

const MainTitle = () => {
  return (
    <header className="main-title">
      <img className="title-img" src={MainLogo} alt="logo" />
      <h1 className="title">IUBAT Innovation & Entrepreneurship Center</h1>
    </header>
  );
};

export default MainTitle;
