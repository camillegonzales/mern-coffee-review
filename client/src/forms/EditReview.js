import { useParams } from "react-router-dom";

const EditReview = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Review</h2>
      <p>Review ID: {id}</p>

    </div>
  );
};

export default EditReview;
