import TicketNum from "./TicketNum";
import "./Ticket.css";

function Ticket({ ticket }) {
  return (
    <div className="Ticket">
      {ticket.map((num, idx) => {
        return <TicketNum num={num} key={idx} />;
      })}
    </div>
  );
}

export default Ticket;
