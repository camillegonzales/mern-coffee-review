import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import { reviewContext } from '../context/ReviewContext/ReviewContext';
import UserBookmarks from "../components/UserProfile/UserBookmarks";
import UserReviews from "../components/UserProfile/UserReviews";
import { formatDate } from "../utils/formatDate";

const UserProfile = () => {
  const { fetchProfileAction, profile } = useContext(authContext);
  const { deleteReviewAction } = useContext(reviewContext);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');

  useEffect(() => {
    fetchProfileAction();
  }, []);

  // Format createdAt date
  useEffect(() => {
    if (profile?.createdAt) {
      setFormattedCreatedAt(formatDate(profile.createdAt));
    }
  }, [profile?.createdAt]);

  const handleDeleteReview = (reviewId) => {
    deleteReviewAction(reviewId);
  };

  return (
    <>
      <h1>Welcome, {profile?.userName}</h1>
      <h2>User Information:</h2>
      <p>Email: {profile?.email}</p>
      <p>Joined: {formattedCreatedAt}</p>

      <UserBookmarks bookmarks={profile?.bookmarks} />
      <UserReviews reviews={profile?.reviews} onDeleteReview={handleDeleteReview} />
    </>
  );
};

export default UserProfile;
