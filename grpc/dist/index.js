"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const path_1 = __importDefault(require("path"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
//Create the package definition using your proto file.
const packageDefinition = protoLoader.loadSync(path_1.default.join(__dirname, "../src/a.proto"));
//Load the packageDefinition into this file.
const personProto = grpc.loadPackageDefinition(packageDefinition);
//Usually, we use a database to get the users data & all, but for now let's just use a variable to store mock data.
const Persons = [];
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
server.addService(personProto.PersonService.service, { addPerson: addPerson, getPersonByName: getPersonByName }
//This second arguement contains all the handlers for this particular service.
);
//Similar to app.listen.
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
