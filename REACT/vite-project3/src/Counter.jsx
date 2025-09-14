import { useState, useEffect } from "react";

function Counter() {
  let [countx, setCountx] = useState(0);
  let [county, setCounty] = useState(0);

  let incCountx = () => {
    setCountx((prevCount) => {
      return (prevCount = prevCount + 1);
    });
  };

  let incCounty = () => {
    setCounty((prevCount) => {
      return (prevCount = prevCount + 1);
    });
  };

  useEffect(() => {
    console.log("this is the side effect.");
  }, [countx]);
  return (
    <div>
      <p>{countx}</p>
      <button onClick={incCountx}>+1</button>
      <p>{county}</p>
      <button onClick={incCounty}>+1</button>
    </div>
  );
}

export default Counter;
