import * as grpc from "@grpc/grpc-js";
import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import { ServiceClientConstructor } from "@grpc/grpc-js";
import { ProtoGrpcType } from "./generated/a";
import { PersonServiceHandlers } from "./generated/PersonService";

//Create the package definition using your proto file.
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

//Load the packageDefinition into this file.
const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

//The above types syntax is what you'll usually see in codebases, what's happening here is that we're forcing our
//given types on the variable, instead of what was their types initially & we can't do it directly, so we're first
//making it unknown & then giving our types.

//Usually, we use a database to get the users data & all, but for now let's just use a variable to store mock data.

const Persons: any[] = [];

//Create your grpc server.
const server = new grpc.Server();

//call contains all the data using which call is made, similar to req object of express.
//callback object is like res object of express.

//By adding types like this that we got by running that script, we've generated types for these functions using
//our proto file.

const handlers: PersonServiceHandlers = {
  AddPerson: function addPerson(call, callback) {
    console.log(call);
    //get the data sent with call from this object.
    let person = {
      name: call.request.name,
      age: call.request.age,
    };

    Persons.push(person);
    callback(null, person);
  },
  GetPersonByName: function getPersonByName(call, callback) {
    const name = call.request.name;
    const person = Persons.find((p) => p.name === name);
    //These are error first callbacks, first arg is null means there's no error, else you could've just sent the error.
    callback(null, person);
  },
};

//Method to add services finally. Similar to app.use.
//Means add this service with these functions.
server.addService(
  personProto.PersonService.service,
  handlers
  //This second arguement contains all the handlers for this particular service.
);

//Similar to app.listen.
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
