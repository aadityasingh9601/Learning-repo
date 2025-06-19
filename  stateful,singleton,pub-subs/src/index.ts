import express from "express";
import { games } from "./store";
import { startLogger } from "./logger";

//What we're trying to do is just simulate a space, where the state is stored in-memory, it's not actual, we're
//just experimenting, what it would look like.
//In a real system, you would have a ws connection or something here that catches the various events that are
//happening and pushes them into the games or whatever state variable there is.

startLogger();

setInterval(() => {
  games.push({
    id: Math.random().toString(),
    whitePlayerName: "John",
    blackPlayerName: "Doe",
    moves: [],
  });
}, 3000);

//Try running this code now, it'll work as you want it to, the state keeps updating, the values keeps getting logged
//so it's become stateful now, you're storing it in-memory means in a variable(in RAM).

//But there're some problems here, like id you want to update the state, you would have to do it like --
//games[0].moves.push("xyz"); This looks bad and also hectic, we've to write our code in such a way that the users
//of our code can easily interact with it,use it and modify with it.

//So we'll now study a better structure and format of doing the same things, that's clean, easy to use,preferred
//standard practice in production level code.

//Classes and singleton pattern.
