import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext/AuthContext";
import axios from "axios";
import UserBookmarks from "./UserBookmarks";
import UserReviews from "./UserReviews";
import { formatDate } from "../../utils/formatDate";

const UserProfile = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfileAction();
  }, []);

  // Format createdAt date
  useEffect(() => {
    if (profile?.createdAt) {
      setFormattedCreatedAt(formatDate(profile.createdAt)); // Use the formatDate function
    }
  }, [profile?.createdAt]);

  return (
    <>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <h1>Welcome, {profile?.userName}</h1>
          <h2>User Information:</h2>
          <p>Email: {profile?.email}</p>
          <p>Joined: {formattedCreatedAt}</p>

          <UserBookmarks bookmarks={profile?.bookmarks} />
          <UserReviews reviews={profile?.reviews} />
        </>
      )}
    </>
  );
};

export default UserProfile;
