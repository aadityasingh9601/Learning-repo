"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//create an object to store the otps. It's a in-memory store.
const otpStore = {};
app.post("/generate-otp", (req, res) => {
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
app.post("/reset-password", (req, res) => {
    const { otp, newPassword, email } = req.body;
    if (!otp || !newPassword || !email) {
        return res.status(400).json({ message: "All three are required" });
    }
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
});
app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});
