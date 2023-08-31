import PropTypes from "prop-types";

import "../scss/activeUserCard.scss";

const ActiveUserCard = ({ userData }) => {
  return (
    <div className="card-container">
      <p className="name">{userData.name}</p>
      <p className="id">
        <span>ID: </span>
        {userData.id}
      </p>
      <p>Joined at: {userData.lastJoinedAt}</p>
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