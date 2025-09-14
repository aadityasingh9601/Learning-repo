import { useState } from "react";
import { genTicket, sum } from "./helper";
import Ticket from "./Ticket";

function LotteryGame({ n = 3, winningCondition }) {
  let [ticket, setTicket] = useState(genTicket(n));
  let isWinning = winningCondition(ticket);

  let buyTicket = () => {
    setTicket(genTicket(n));
  };
  return (
    <div>
      <h2>Play the lottery!</h2>
      <Ticket ticket={ticket} />
      <button onClick={buyTicket}>Get New Ticket</button>
      {isWinning && <h3>Congratulations! You won the lottery.</h3>}
    </div>
  );
}

export default LotteryGame;
