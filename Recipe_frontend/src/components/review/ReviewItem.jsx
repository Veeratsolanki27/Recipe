import React from "react";
import RatingStars from "../common/RatingStars";

const ReviewItem = ({ review }) => {
  const userName = review?.userName || review?.user?.username || review?.username || "Anonymous";
  const rating = review?.rating || review?.stars || 5;
  const comment = review?.comment || review?.feedBack || review?.feedback || "";
  const date = review?.date || "Recently";

  return (
    <div className="p-3 bg-light rounded-3 border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: "36px", height: "36px" }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="fw-bold text-dark">{userName}</div>
            <small className="text-muted">{date}</small>
          </div>
        </div>
        <RatingStars rating={rating} size="small" />
      </div>
      <p className="mb-0 text-secondary small">{comment}</p>
    </div>
  );
};

export default ReviewItem;
