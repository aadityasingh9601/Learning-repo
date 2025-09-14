import "./ItemList.css";
import Item from "./Item";

function ItemList() {
  let options = {
    a: "8000 DPI",
    b: "5 Programmable Buttons",
  };
  let options2 = {
    a: "Intuitive Touch Surface",
    b: "Designed for iPad Pro",
  };
  let options3 = {
    a: "Designed for iPad Pro",
    b: "Intuitive Touch Surface",
  };
  let options4 = {
    a: "Wireless Mouse 2.4Ghz",
    b: "Optical Orientation",
  };
  return (
    <div className="ItemList">
      <h1>Blockbuster deals on computer accessories|Shop now</h1>
      <Item
        title="Logitech MX Master"
        features={options}
        price="12500"
        idx={0}
      />
      <Item
        title="Apple Pencil(2nd Gen)"
        features={options2}
        price="12000"
        idx={1}
      />
      <Item title="Zebronics" features={options3} price="1600" idx={2} />
      <Item title="Petronics Toad" features={options4} price="600" idx={3} />
    </div>
  );
}

export default ItemList;
