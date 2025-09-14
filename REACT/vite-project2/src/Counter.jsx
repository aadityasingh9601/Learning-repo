import { useState } from "react";

function Counter() {
  //Defining our state variable for our counter.
  const [count, setCount] = useState(0);
  let incCount = () => {
    setCount(count + 1);
    console.log(count);
  };
  return (
    <div className="Counter">
      <h3>Count={count}</h3>
      <button onClick={incCount}>Increase count</button>
    </div>
  );
}

export default Counter;
