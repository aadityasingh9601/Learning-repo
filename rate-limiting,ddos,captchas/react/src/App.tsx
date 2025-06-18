import { useRef, useState } from "react";
import "./App.css";
import { Turnstile } from "@marsidev/react-turnstile";

function App() {
  const [token, setToken] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  //The captcha will verify if you're legitimate or not, and then generate a token, you can send that to backend,
  //on the backend, it'll verify your token with your secret, if it's valid, then the action(for which the request)
  //was created, will be successful, else it'll be rejected.

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/reset-password", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      console.log(data);
    }
  }

  return (
    <div>
      {JSON.stringify(token)}
      <form ref={formRef} onSubmit={handleSubmit}>
        <input placeholder="Enter your email" />
        <input placeholder="Enter your password" />
        <button type="submit">Reset password</button>
      </form>
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
