import "../scss/dashboard.scss";

// Local Components:
import ActiveUsers from "../components/ActiveUsers";
import AuthForm from "../components/AuthForm";
import MainTitle from "../components/MainTitle.jsx";

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
      <MainTitle />

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
