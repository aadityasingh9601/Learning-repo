import { PubSubManager } from "./pubSubManager";
import { GameManager } from "./store";

export function startLogger() {
  setInterval(() => {
    //GameManager.getInstance().log();
    //Simulates users subscriptions on regular intervals.
    PubSubManager.getInstance().userUnsubscribe("google", "0.3676694471124484");
  }, 3000);
}

// Similar to the function here, you can store the state of backend into the database, as state updates, you can
//push those changes to a queue and then the queue will keep updating the state in the database.
