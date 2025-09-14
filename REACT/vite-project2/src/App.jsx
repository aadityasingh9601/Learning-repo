import Lottery from "./Lottery";
import LotteryGame from "./LotteryGame";
import { sum } from "./helper";

function App() {
  let winningCondition = (ticket) => {
    return ticket.every((num) => num === ticket[0]);
  };
  return (
    <LotteryGame
      n={Math.floor(Math.random() * 3) + 2}
      winningCondition={winningCondition}
    />
  );
}

export default App;
