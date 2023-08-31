import "../scss/dashboard.scss";

// Local Components:
import ActiveUsers from "../components/ActiveUsers";
import AuthForm from "../components/AuthForm";

// local custom hooks:
import useFetchUsers from "../hooks/useFetchUsers";

// assets:
import MainLogo from "../assets/main-logo.png";

const Dashboard = () => {
  const {
    data: activeUsersList,
    reload: reloadActiveUsersList,
    isLoading: isActiveUsersListLoading,
  } = useFetchUsers("/active");

  return (
    <section className="dashboard-page">
      {/* <div className="overlay-logo"></div> */}

      <header className="title-section">
        <img className="title-img" src={MainLogo} alt="logo" />
        <h1 className="title">IUBAT Innovation & Entrepreneurship Center</h1>
      </header>

      <AuthForm
        activeUsersList={activeUsersList}
        reloadActiveUsersList={reloadActiveUsersList}
      />

      <ActiveUsers
        activeUsersList={activeUsersList}
        isActiveUsersListLoading={isActiveUsersListLoading}
      />
    </section>
  );
};

export default Dashboard;
