"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("redis");
//Suppose we're trying to create a pub-sub architecture for a stock exchange.
class PubSubManager {
    //Making the constructor so that it can't be called from outside & multiple instances are created.
    constructor() {
        this.subscriptions = new Map();
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
    }
    static getInstance() {
        if (PubSubManager.instance)
            return PubSubManager.instance;
        PubSubManager.instance = new PubSubManager();
        return PubSubManager.instance;
    }
    userSubscribe(channel, userId) {
        var _a, _b;
        //Check if the stock that the user's trying to subscrible to even exists in the map or not, if not, create that
        //entry inside the map.
        if (!this.subscriptions.get(channel)) {
            this.subscriptions.set(channel, []);
        }
        //If it exits, then push the user's id into it, means subscribe the user.
        (_a = this.subscriptions.get(channel)) === null || _a === void 0 ? void 0 : _a.push(userId);
        console.log(`User ${userId} subscribed to the channel ${channel}`);
        //If there's atleast one user subscribed to this, then subscribe to that channel.
        if (((_b = this.subscriptions.get(channel)) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            this.redisClient.subscribe(channel, (message) => {
                console.log(message);
                this.handleMessage(channel, message);
            });
            console.log(`Subscribed to Redis channel ${channel}`);
        }
    }
    userUnsubscribe(channel, userId) {
        var _a, _b;
        //If the channel exists, then remove the user's id from that chaneel, means unsubscribe the user.
        if (this.subscriptions.get(channel)) {
            (_a = this.subscriptions.get(channel)) === null || _a === void 0 ? void 0 : _a.filter((sub) => sub !== userId);
            console.log(`User ${userId} unsubscribed from channel ${channel}`);
        }
        //If the channel has 0 subscribers, then remove that from the pub sub, means we don't need any updates from
        //that channel.
        if (((_b = this.subscriptions.get(channel)) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            this.redisClient.unsubscribe(channel, (message) => {
                console.log(message);
            });
            console.log(`UnSubscribed from the Redis channel ${channel}`);
        }
    }
    handleMessage(stock, message) {
        var _a;
        console.log(`Message ${message} was published`);
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.forEach((sub) => {
            //In real-world, we would've emitted a web socket event to sent message to each of the user.
            console.log(`Message sent to ${sub}`);
        });
    }
}
exports.PubSubManager = PubSubManager;
