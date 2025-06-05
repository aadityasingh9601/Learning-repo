import { createClient } from "redis";

const client = createClient();

async function main() {
  //Connect to redis.
  await client.connect();
  console.log("connected to redis");

  //Start pulling data from the queue.
  while (true) {
    const response = await client.brPop("submissions", 0);
    console.log(response);

    //Here you can after pulling from the queue, actually run the user's code inside a worker or docker container
    //or something.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //After the work is finished, eg. user's code is executed successfully, then publish the event to a pub-sub.
    console.log("Processed user's request successfully!");
  }
}

main();
