import "./Item.css";
import Title from "./Title";
import Description from "./Description";
import Price from "./Price";

function Item({ title, features, price, idx }) {
  let oldPrice = ["12500", "12000", "4600", "600"];
  let newPrice = ["8999", "9199", "4199", "299"];
  return (
    <div className="Item">
      <Title title={title} />
      <Description features={features} />
      <Price oldPrice={oldPrice[idx]} newPrice={newPrice[idx]} />
    </div>
  );
}

export default Item;
