import { Link } from "react-router-dom";

import "../scss/dashboard.scss";

// Local Components:
import ActiveUsers from "../components/ActiveUsers";

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
      <div className="auth-section">
        <div className="form">
          <div className="labels-container">
            <label>ID</label>
            <label>Password</label>
          </div>

          <div className="inputs-container">
            <input type="string" />
            <input type="password" />
          </div>
        </div>

        <div className="buttons-container">
          <button
            className="btn"
            onClick={() => {
              reloadActiveUsersList();
            }}
          >
            Login
          </button>
          <button
            className="btn"
            onClick={() => {
              reloadActiveUsersList();
            }}
          >
            Logout
          </button>
          <Link className="btn" to={"register"}>
            New here? click to register your account!
          </Link>
        </div>
      </div>

      <ActiveUsers
        activeUsersList={activeUsersList}
        isActiveUsersListLoading={isActiveUsersListLoading}
      />
    </section>
  );
};

export default Dashboard;
