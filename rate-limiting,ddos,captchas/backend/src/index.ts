import express from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//Similarly you can create multiple limiters for different routes, or create a single limiter and pass that in
//app.use(limiter) to do rate-limiting.
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message:
    "Too many otp generation requests, please try again after 15 minutes",
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

//create an object to store the otps. It's a in-memory store.
const otpStore: Record<string, string> = {};

app.post("/generate-otp", otpLimiter, (req: any, res: any) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  //Generate a 6 digit otp.
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //Generally send a email to the user about the generated otp.
  otpStore[email] = otp;

  console.log(otpStore);
  return res.status(200).json({ message: "OTP generated and logged!" });
});

app.post("/reset-password", async (req: any, res: any) => {
  const { otp, newPassword, email, token } = req.body;
  console.log(token);
  //console.log(req.body);

  // if (!otp || !newPassword || !email) {
  //   return res.status(400).json({ message: "All three are required" });
  // }

  //Verfying our token.
  const verifyEndpoint =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret = "0x4AAAAAABhHrHCz1rKVPFr_BLYWMGGH4DY";

  const response = await fetch(verifyEndpoint, {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
      token
    )}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  //Check the status, if valid, perform the task, if not, don't perform the task or do whatever you want to.
  console.log(await response.json());
  return res.status(200).json(response);

  // const data = (await res.json()) as TurnstileServerValidationResponse;

  // console.log(data);

  if (otpStore[email] === otp) {
    console.log(`Password of user ${email} reseted to ${newPassword}`);
    //Delete the otp after usage.
    delete otpStore[email];
    return res.status(200).json({
      message: "Password reset successful!",
    });
  } else {
    return res.status(401).json({
      message: "Invalid otp",
    });
  }
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
