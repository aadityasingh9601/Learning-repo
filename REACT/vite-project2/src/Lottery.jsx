import { useState } from "react";

function Lottery() {
  const [ticket, setTicket] = useState("000");
  let [sum, setSum] = useState("0");

  let generateTicket = () => {
    let random = (Math.floor(Math.random() * 900) + 100).toString();
    //We converted it to string to access each index of the random number.
    checkSum(random);
    setTicket(random);
  };

  let checkSum = (random) => {
    sum = parseInt(random[0]) + parseInt(random[1]) + parseInt(random[2]);
    //here during the time of addition we have to convert them into numbers again,
    //else they will concatenate cause they're strings.
    // for (let i = 0; i++; i < 3) {
    //   sum += parseInt(random[i]);
    // } Loop is not working ,find out why later.
    console.log(sum);
    setSum(sum);
  };
  return (
    <div>
      {sum == 15 ? (
        <h2>Congratulations...You won the lottery!!</h2>
      ) : (
        <h2>Play the lottery!!</h2>
      )}

      <h3>Lottery Ticket = {ticket}</h3>
      <button onClick={generateTicket}>Get New Ticket</button>
    </div>
  );
}

export default Lottery;
