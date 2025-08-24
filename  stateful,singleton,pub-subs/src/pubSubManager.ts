import { createClient, RedisClientType } from "redis";

//Suppose we're trying to create a pub-sub architecture for a stock exchange.

export class PubSubManager {
  private static instance: PubSubManager;

  private redisClient: RedisClientType;

  private subscriptions: Map<string, string[]> = new Map();

  //Making the constructor so that it can't be called from outside & multiple instances are created.
  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
  }

  public static getInstance() {
    if (PubSubManager.instance) return PubSubManager.instance;

    PubSubManager.instance = new PubSubManager();

    return PubSubManager.instance;
  }

  public userSubscribe(channel: string, userId: string) {
    //Check if the stock that the user's trying to subscrible to even exists in the map or not, if not, create that
    //entry inside the map.
    if (!this.subscriptions.get(channel)) {
      this.subscriptions.set(channel, []);
    }
    //If it exits, then push the user's id into it, means subscribe the user.
    this.subscriptions.get(channel)?.push(userId);
    console.log(`User ${userId} subscribed to the channel ${channel}`);
    //If there's atleast one user subscribed to this, then subscribe to that channel.
    if (this.subscriptions.get(channel)?.length === 1) {
      this.redisClient.subscribe(channel, (message) => {
        console.log(message);
        this.handleMessage(channel, message);
      });
      console.log(`Subscribed to Redis channel ${channel}`);
    }
  }

  public userUnsubscribe(channel: string, userId: string) {
    //If the channel exists, then remove the user's id from that chaneel, means unsubscribe the user.
    if (this.subscriptions.get(channel)) {
      this.subscriptions.get(channel)?.filter((sub) => sub !== userId);
      console.log(`User ${userId} unsubscribed from channel ${channel}`);
    }
    //If the channel has 0 subscribers, then remove that from the pub sub, means we don't need any updates from
    //that channel.
    if (this.subscriptions.get(channel)?.length === 0) {
      this.redisClient.unsubscribe(channel, (message) => {
        console.log(message);
      });
      console.log(`UnSubscribed from the Redis channel ${channel}`);
    }
  }

  public handleMessage(stock: string, message: string) {
    console.log(`Message ${message} was published`);
    this.subscriptions.get(stock)?.forEach((sub) => {
      //In real-world, we would've emitted a web socket event to sent message to each of the user.
      console.log(`Message sent to ${sub}`);
    });
  }
}
