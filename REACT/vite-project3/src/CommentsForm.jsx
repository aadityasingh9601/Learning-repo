import { useState } from "react";

function CommentsForm({ addComment }) {
  let [formData, setFormData] = useState({
    username: "",
    remark: "",
    rating: "",
  });

  let handleInputAll = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: [event.target.value] };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    addComment(formData);
    setFormData({
      username: "",
      remark: "",
      rating: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          placeholder="enter username"
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputAll}
        />
        <br></br>
        <label htmlFor="username">Remark</label>
        <input
          placeholder="remark"
          id="remark"
          type="text"
          name="remark"
          value={formData.remark}
          onChange={handleInputAll}
        />
        <br></br>
        <label htmlFor="username">Rating</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          name="rating"
          value={formData.rating}
          onChange={handleInputAll}
        />
        <br></br>
        <button>Add comment</button>
      </form>
    </div>
  );
}

export default CommentsForm;
