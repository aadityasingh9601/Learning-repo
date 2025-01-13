"use strict";
const users = new Map();
users.set("abc", { name: "Aaditya", age: 19, email: "abc@gmail.com" });
users.set("xyz", { name: "Yash", email: "xyz@gmail.com", age: 17 });
let Yash = users.get("xyz");
let Aadi = users.get("abc");
console.log(Yash);
console.log(Aadi);
