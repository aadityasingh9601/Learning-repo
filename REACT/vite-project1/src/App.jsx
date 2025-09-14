import "./App.css";
import Product from "./Product.jsx";
import Hello from "./Hello.jsx";
import ItemList from "./ItemList.jsx";

function App() {
  return <ItemList />;
}

// function App() {
//   let options = ["hitech", "fast", "durable"];
//   let options2 = {
//     a: "apple",
//     b: "banana",
//     c: "cheery",
//   };
//   return (
//     <>
//       <Product
//         title="Phone"
//         price="10000"
//         features={options}
//         features2={options2}
//       />
//       <Product title="Laptop" price="40000" features2={options2} />
//       <Product title="Headphones" price="1000" features2={options2} />
//     </>
//   );
// }

export default App;
