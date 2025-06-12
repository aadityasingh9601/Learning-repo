import { DefaultService } from "./generated";

async function main() {
  const response = await DefaultService.getUsers("12230");
  console.log(response);
}

main();
