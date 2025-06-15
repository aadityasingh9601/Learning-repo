import { useState } from "react";
import "./App.css";
import { Turnstile } from "@marsidev/react-turnstile";

function App() {
  const [token, setToken] = useState<string>();
  return (
    <div>
      {JSON.stringify(token)}
      <input placeholder="Enter your email" />
      <input placeholder="Enter your password" />
      <button>Reset password</button>
      <Turnstile
        siteKey="0x4AAAAAABhHrEsdZMtMBL7l"
        onSuccess={(token) => {
          setToken(token);
        }}
      />
    </div>
  );
}

export default App;
