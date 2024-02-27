import { useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Add Review</h2>
      <p>Shop ID: {id}</p>

    </div>
  );
};

export default AddReview;
