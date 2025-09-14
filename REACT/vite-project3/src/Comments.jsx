import "./Comments.css";
import { useState } from "react";
import CommentsForm from "./CommentsForm";

function Comments() {
  let [comments, setComments] = useState([
    { username: "Aaditya", remark: "Good", rating: "5" },
  ]);

  let addComment = (comment) => {
    setComments((currComments) => {
      return [...currComments, comment];
    });
  };
  return (
    <div>
      <h3>All comments.</h3>
      {comments.map((comment, idx) => (
        <div className="comment">
          <span key={idx}>
            <b>-{comment.username}</b>
          </span>
          <br></br>
          <span key={idx}>
            <i>"{comment.remark}"</i>
          </span>
          <br></br>
          <span key={idx}>Rating={comment.rating}</span>
          <br></br>
        </div>
      ))}
      <CommentsForm addComment={addComment} />
    </div>
  );
}

export default Comments;
