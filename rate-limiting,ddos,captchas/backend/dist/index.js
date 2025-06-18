"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Similarly you can create multiple limiters for different routes, or create a single limiter and pass that in
//app.use(limiter) to do rate-limiting.
const otpLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many otp generation requests, please try again after 15 minutes",
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});
//create an object to store the otps. It's a in-memory store.
const otpStore = {};
app.post("/generate-otp", otpLimiter, (req, res) => {
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
app.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, newPassword, email, token } = req.body;
    console.log(token);
    //console.log(req.body);
    // if (!otp || !newPassword || !email) {
    //   return res.status(400).json({ message: "All three are required" });
    // }
    const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const secret = "0x4AAAAAABhHrHCz1rKVPFr_BLYWMGGH4DY";
    const response = yield fetch(verifyEndpoint, {
        method: "POST",
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    });
    console.log(yield response.json());
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
    }
    else {
        return res.status(401).json({
            message: "Invalid otp",
        });
    }
}));
app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});
