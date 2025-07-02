import * as grpc from "@grpc/grpc-js";
import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";

//Create the package definition using your proto file.
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "./a.proto")
);

//Load the packageDefinition into this file.
const personProto = grpc.loadPackageDefinition(packageDefinition);

//Usually, we use a database to get the users data & all, but for now let's just use a variable to store mock data.

const Persons: any[] = [];

//@ts-ignore -- It's just a shortcut, not recommeded.
//call contains all the data using which call is made, similar to req object of express.
//callback object is like res object of express.
function addPerson(call, callback) {
  console.log(call);
  //get the data sent with call from this object.
  let person = {
    name: call.request.name,
    age: call.request.age,
  };

  Persons.push(person);
  callback(null, person);
}

//@ts-ignore
function getPersonByName(call, callback) {
  const name = call.request.name;
  const person = Persons.find((p) => p.name === name);
  callback(null, person);
}

//Create your grpc server.
const server = new grpc.Server();

//Method to add services finally. Similar to app.use.
//Means add this service with these functions.
server.addService(
  (personProto.PersonService as ServiceClientConstructor).service,
  { addPerson: addPerson, getPersonByName: getPersonByName }
  //This second arguement contains all the handlers for this particular service.
);

//Similar to app.listen.
server.bindAsync(
  "0.0.0.0.50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
