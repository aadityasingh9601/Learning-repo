"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const logger_1 = require("./logger");
//What we're trying to do is just simulate a space, where the state is stored in-memory, it's not actual, we're
//just experimenting, what it would look like.
//In a real system, you would have a ws connection or something here that catches the various events that are
//happening and pushes them into the games or whatever state variable there is.
(0, logger_1.startLogger)();
setInterval(() => {
    store_1.games.push({
        id: Math.random().toString(),
        whitePlayerName: "John",
        blackPlayerName: "Doe",
        moves: [],
    });
}, 3000);
