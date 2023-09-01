import PropTypes from "prop-types";

import "../scss/activeUserCard.scss";

const ActiveUserCard = ({ userData }) => {
  return (
    <div className="card-container">
      <p>
        <span>{userData.name}</span>
      </p>
      <p className="id">
        <span>ID: </span>
        {userData.id}
      </p>
      <p>
        <span>{userData.lastJoinedAt}</span>
      </p>
    </div>
  );
};

ActiveUserCard.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    lastJoinedAt: PropTypes.string,
  }),
};

export default ActiveUserCard;
