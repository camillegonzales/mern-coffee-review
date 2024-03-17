import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
// import UserBookmarks from "../components/UserProfile/UserBookmarks";
import UserReviews from "../components/UserProfile/UserReviews";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { fetchProfileAction, profile } = useContext(authContext);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');
  const [userReviews, setUserReviews] = useState(null);

  useEffect(() => {
    fetchProfileAction();
    // eslint-disable-next-line
  }, []);

  // Format createdAt date
  useEffect(() => {
    if (profile?.createdAt) {
      setFormattedCreatedAt(formatDate(profile.createdAt));
    }
  }, [profile?.createdAt]);

  useEffect(() => {
    setUserReviews(profile?.reviews);
  }, [profile?.reviews]);

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = userReviews.filter(review => review._id !== reviewId);
    setUserReviews(updatedReviews);
    toast.success('Review deleted successfully');
  };

  return (
    <div className="page">
      <h1>Welcome, {profile?.userName}</h1>
      <div className="user-info">
        <h2>User Information:</h2>
        <p>Email: {profile?.email}</p>
        <p>Joined: {formattedCreatedAt}</p>
      </div>
      

      {/* <UserBookmarks bookmarks={profile?.bookmarks} /> */}
      <UserReviews reviews={userReviews} onDeleteReview={handleDeleteReview} />
    </div>
  );
};

export default UserProfile;
