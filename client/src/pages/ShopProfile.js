import { useParams } from "react-router-dom";

const ShopProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Shop Profile</h2>
      <p>Shop ID: {id}</p>

    </div>
  );
};

export default ShopProfile;
