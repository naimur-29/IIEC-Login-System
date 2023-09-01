import "../scss/skeletonActiveUserCard.scss";

const SkeletonActiveUserCard = () => {
  return (
    <div className="skeleton-card-container">
      <p>
        <span>Naimur Rahman</span>
      </p>
      <p>
        <span>ID: </span>
        22103227
      </p>
      <p>
        <span>Joined At: </span>
        00:00:00
      </p>
    </div>
  );
};

export default SkeletonActiveUserCard;
