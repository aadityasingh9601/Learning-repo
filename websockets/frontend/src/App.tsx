import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //Pass the types of socket that it is or can be.
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState("");
  const [latestMsg, setlatestMsg] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log(message.data);
      setlatestMsg(message.data);
    };

    //cleanup after work is done.
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {socket ? (
        <div>
          <div>{latestMsg}</div>
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              socket.send(message);
            }}
          >
            Send
          </button>
        </div>
      ) : (
        <div> Connecting to WebSocket...</div>
      )}
    </div>
  );
}

export default App;
