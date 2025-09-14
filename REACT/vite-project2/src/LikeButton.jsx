import "./LikeButton.css";
import { useState } from "react";

function LikeButton() {
  const [isLiked, setisLiked] = useState(false); //Defining state variable.
  let toggleLike = () => {
    setisLiked(!isLiked); //As clicked changed the value to reverse of current value.
  };
  let likeStyle = { color: "red" };
  return (
    <div className="LikeButton">
      <p>Like me!</p>
      <p onClick={toggleLike} style={likeStyle}>
        {/* Applying conditionals according to our state variables value to add styling effects. */}
        {isLiked ? (
          <i class="fa-solid fa-heart"></i>
        ) : (
          <i class="fa-regular fa-heart"></i>
        )}
      </p>
    </div>
  );
}

export default LikeButton;
