import { useState } from "react";

function Ludo() {
  //Defining state variables for all of them together.Similarly,u can do for arrays.
  const [moves, setMoves] = useState({ red: 0, blue: 0, green: 0, yellow: 0 });
  let redMoves = () => {
    setMoves((prevMoves) => {
      return { ...prevMoves, red: prevMoves.red + 1 };
    });
  };

  let blueMoves = () => {
    setMoves((prevMoves) => {
      return { ...prevMoves, blue: prevMoves.blue + 1 };
    });
  };

  let greenMoves = () => {
    setMoves((prevMoves) => {
      return { ...prevMoves, green: prevMoves.green + 1 };
    });
  };

  let yellowMoves = () => {
    setMoves((prevMoves) => {
      return { ...prevMoves, yellow: prevMoves.yellow + 1 };
    });
  };
  return (
    <div>
      <p>Red moves:{moves.red}</p>
      <button style={{ backgroundColor: "red" }} onClick={redMoves}>
        +1
      </button>

      <p>Blue moves:{moves.blue}</p>
      <button style={{ backgroundColor: "blue" }} onClick={blueMoves}>
        +1{" "}
      </button>

      <p>Green moves:{moves.green}</p>
      <button style={{ backgroundColor: "green" }} onClick={greenMoves}>
        +1
      </button>

      <p>Yellow moves:{moves.yellow}</p>
      <button style={{ backgroundColor: "yellow" }} onClick={yellowMoves}>
        +1
      </button>
    </div>
  );
}

export default Ludo;
// setMoves(moves);//Merely passing the objects/arrays like this don't work as even if
//the value of object are changed , it's address remains the same and no change is
//detected by react, so no re-rendering occcurs.
// setMoves({ ...moves, red: moves.red + 1 });//So, we do this.This works well too but
// as we know we have to use callbacks when the new value depends on the old value.
