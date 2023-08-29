import { useState } from "react";
import PropTypes from "prop-types";

import "../scss/activeUsers.scss";

// local components:
import ActiveUserCard from "./ActiveUserCard";

const ActiveUsers = ({ activeUsersList, isActiveUsersListLoading }) => {
  // states:
  const [searchField, setSearchField] = useState("");

  // functions:
  const filterUser = (user) =>
    user.name.toLowerCase().startsWith(searchField) ||
    String(user.id).startsWith(searchField);

  return (
    <div className="active-users-section">
      <header className="title-section">
        <h3 className="title">Active Users</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchField(e.target.value.toLowerCase())}
          />
        </div>
      </header>

      <div>
        {isActiveUsersListLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="users-list-container">
            {activeUsersList?.length ? (
              activeUsersList
                .filter((user) => filterUser(user))
                .map((user) => (
                  <ActiveUserCard key={user?.id} userData={user} />
                ))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ActiveUsers.propTypes = {
  activeUsersList: PropTypes.array,
  isActiveUsersListLoading: PropTypes.bool,
};

export default ActiveUsers;
