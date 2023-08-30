import "../scss/dashboard.scss";

// Local Components:
import ActiveUsers from "../components/ActiveUsers";
import AuthForm from "../components/AuthForm";

// local custom hooks:
import useGetManyUsers from "../hooks/useGetManyUsers";

const Dashboard = () => {
  const {
    data: activeUsersList,
    reload: reloadActiveUsersList,
    isLoading: isActiveUsersListLoading,
  } = useGetManyUsers("/active");

  return (
    <section className="dashboard-page">
      <header className="title-section">
        <h1>IIEC Login System</h1>
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
