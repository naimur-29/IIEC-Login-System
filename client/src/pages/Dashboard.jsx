import "../scss/dashboard.scss";

// Local Components:
import ActiveUsers from "../components/ActiveUsers";
import AuthForm from "../components/AuthForm";

// local custom hooks:
import useFetchUsers from "../hooks/useFetchUsers";

const Dashboard = () => {
  const {
    data: activeUsersList,
    reload: reloadActiveUsersList,
    isLoading: isActiveUsersListLoading,
  } = useFetchUsers("/active");

  return (
    <section className="dashboard-page">
      <header className="title-section">
        <h1>IUBAT Innovation & Entrepreneurship Center</h1>
      </header>

      <AuthForm reloadActiveUsersList={reloadActiveUsersList} />

      <ActiveUsers
        activeUsersList={activeUsersList}
        isActiveUsersListLoading={isActiveUsersListLoading}
      />
    </section>
  );
};

export default Dashboard;
