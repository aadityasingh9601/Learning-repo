import "./Product.css";

function Product({ title, price, features, features2 }) {
  const list = features && features.map((feature) => <li>{feature}</li>); //n
  //Earlier the error was happening because you didn't defined features for every product
  //component ,u resolved that problem by either defining it for every component or using
  //the syntax "n" , because that means if features exist only then do this.
  // U can use any syntax of conditionals shown below.
  let styles = { backgroundColor: price > 5000 ? "pink" : "yellow" };
  let styles2 = { color: price > 10000 ? "blue" : "" };
  return (
    <div className="Product" style={styles2}>
      <h3>{title}</h3>
      <p>{price}</p>
      {/* {price > 5000 ? <p>Discount of 5%</p> : null} */}
      {price > 5000 && <p>Discount of 5%</p>}
      <p>{list}</p>
      <p>{features2.b}</p>
    </div>
  );
}

export default Product;
