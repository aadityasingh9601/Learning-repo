import "./Price.css";

let oldStyles = { textDecoration: "line-through" };

function Price({ oldPrice, newPrice }) {
  return (
    <div className="Price">
      <span style={oldStyles}>{oldPrice}</span>
      &nbsp; &nbsp; &nbsp;
      <span>
        <b>{newPrice}</b>
      </span>
    </div>
  );
}

export default Price;
