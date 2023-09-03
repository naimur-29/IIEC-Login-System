import "../scss/mainTitle.scss";

// assets:
import MainLogo from "../assets/main-logo.png";

const MainTitle = () => {
  return (
    <>
      <header className="main-title">
        <img className="title-img" src={MainLogo} alt="logo" />
        <h1 className="title">IUBAT Innovation & Entrepreneurship Center</h1>
      </header>

      {/* CREDITS */}
      <p
        style={{
          color: "rgba(43, 175, 102)",
          backgroundColor: "rgba(252, 246, 246, 0.5)",
          fontWeight: 500,
          position: "fixed",
          bottom: 0,
          right: 0,
          padding: "4px 12px",
          zIndex: 999,
          backdropFilter: "blur(5px)",
          fontSize: "1.2rem",
          borderRadius: "4px",
          userSelect: "none",
        }}
      >
        {"Artisan: "}
        <a
          onMouseOver={(event) =>
            (event.target.style.textDecoration = "underline")
          }
          onMouseLeave={(event) => (event.target.style.textDecoration = "none")}
          href="https://dev.naimur29.com/"
          target="_blank"
          rel="noreferrer"
        >
          Naimur Rahman
        </a>
      </p>
      {/* CREDITS */}
    </>
  );
};

export default MainTitle;
