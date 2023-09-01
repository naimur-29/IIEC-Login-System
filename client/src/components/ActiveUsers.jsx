import { useState } from "react";
import PropTypes from "prop-types";

import "../scss/activeUsers.scss";

// local components:
import ActiveUserCard from "./ActiveUserCard";
import SkeletonActiveUserCard from "./SkeletonActiveUsersCard";

// global variables:
const dummyUsers = [];
for (let i = 0; i < 10; i++) {
  dummyUsers.push(null);
}

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
        <h3 className="title">
          Active Users
          {activeUsersList.length
            ? ` [ ${
                activeUsersList.length > 0 && activeUsersList.length < 10
                  ? "0" + activeUsersList.length
                  : activeUsersList.length
              } ]`
            : " [...]"}
        </h3>

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchField(e.target.value.toLowerCase())}
        />
      </header>

      <div className="users-list-container">
        {isActiveUsersListLoading ? (
          dummyUsers.map((ele, i) => <SkeletonActiveUserCard key={i} />)
        ) : (
          <>
            {activeUsersList?.length ? (
              activeUsersList
                .filter((user) => filterUser(user))
                .map((user) => (
                  <ActiveUserCard key={user?.id} userData={user} />
                ))
            ) : (
              <></>
            )}
          </>
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
