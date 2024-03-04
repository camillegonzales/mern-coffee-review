import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import UserBookmarks from "../components/Profile/UserBookmarks";
import UserReviews from "../components/Profile/UserReviews";
import { formatDate } from "../utils/formatDate";

const UserProfile = () => {
  const { fetchProfileAction, profile } = useContext(authContext);
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

  return (
    <>
      <h1>Welcome, {profile?.userName}</h1>
      <h2>User Information:</h2>
      <p>Email: {profile?.email}</p>
      <p>Joined: {formattedCreatedAt}</p>

      <UserBookmarks bookmarks={profile?.bookmarks} />
      <UserReviews reviews={profile?.reviews} />
    </>
  );
};

export default UserProfile;
