import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const UserProfile = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);
  // Dispatch action
  useEffect(() => {
    fetchProfileAction()
  }, [])
  console.log(error);
  return (
    <>
      <h1>WELCOME</h1>
    </>
  );
};

export default UserProfile;
