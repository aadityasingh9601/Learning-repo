// let x = 10;

// function sum(a: number, b: number): number {
//   return a + b;
// }

// let result = sum(1, 2);
// console.log(result);

// function runAfterOneSec(fn: () => number) {
//   setTimeout(() => {
//     fn();
//   }, 2000);
// }

// runAfterOneSec(function () {
//   return 1;
// });

// const greet = (name: string) => {
//   console.log(`Hello,${name}`);
// };

// interface User {
//   id: number | string;
//   name: string;
//   age: number;
//   email?: string; //? means this field is optional.
//   greet: (msg: string) => void;
// }

// function isLegal(user: User) {
//   if (user.age > 18) {
//     console.log("isLegal  ");
//     console.dir(greet);
//   } else {
//     console.log("not legal");
//   }
// }

// let checkuser = isLegal({
//   age: 19,
//   name: "Aaditya",
//   greet: () => {
//     console.log("Hello");
//   },
// });

//This class implements the interface User, this means this class must have the properties & fields of the
//User interface.
// class Employee implements User {
//   name: string;
//   age: number;
//   id: number | string;
//   constructor(n: string, a: number, id: number | string) {
//     this.age = a;
//     this.name = n;
//     this.id = id;
//   }

//   greet(msg: string) {
//     console.log(`msg`);
//   }
// }

//U can perform unions & intersections with types & types and interfaces & interfaces and types & interfaces.

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface Manager {
//   name: string;
//   department: string;
// }

//Here , intersection of both types means TechLead must have properties of both of them.
//type Techlead = Employee & Manager;

//Here , union of both types means Techlead must have a property that's common in both of them.
//type TechLead = Employee | Manager;

// function Print(person: Techlead) {
//   console.log(person);
// }

// const person = Print({
//   name: "Aaditya",
//   department: "Marketing",
//   startDate: new Date(),
// });

// type ArrNum = number[];

// function maxNum(arr: ArrNum) {
//   let max = 0;
//   for (let e of arr) {
//     if (e > max) {
//       max = e;
//     } else {
//       max = max;
//     }
//   }
//   console.log(max);
// }

// maxNum([1, 2, 4, 5, 8, 9]);

// enum Direction {
//   Up,
//   Down = 100,
//   Left,
//   Right = 1000,
// }

// // function logDir(keyPress: Direction) {
// //   console.log(keyPress);
// // }

// console.log(Direction.Up);
// console.log(Direction.Down);
// console.log(Direction.Left);
// console.log(Direction.Right);

//Generics

type Input = number | string;

// function firstEl(arr: Input[]) {
//   return arr[0];
// }

//const value = firstEl(["aaditya", "singh"]);

//console.log(value.toUpperCase());

//In the case above TS was unable to infer properly the type of value, because Input can b either string or a
//number, but by using Generics, we're telling TS that it's a generic, it's arg can be anything , and it'll return
//what it takes, so TS can infer now, so it won't show any error.

// function identity<T>(arg: T) {
//   return arg;
// }

// let output1 = identity<string>("mystring");
// let output2 = identity<number>(2);

// console.log(output1, output2);

// function firstEl<T>(arr: T[]) {
//   return arr[0];
// }

// const valuee = firstEl<string>(["tello", "hello"]);
// const valuee2 = firstEl<number>([2, 4]);
//To ensure user doesn't pass different kinds of value at time of calling , u should define the type like
//<type> while calling so that TS can infer and provide Type-safety.

// console.log(valuee.toUpperCase());

// interface User {
//   readonly id: string | number;
//   name: string;
//   age: number;
//   email: string;
//   password: string;
// }

// //use Pick to pick only specific fields from a type or interface.
// type updateProps = Pick<User, "name" | "age" | "email">;

// //use Partial to make all fields of a type or interface as optional.
// type updatePropsOptional = Partial<updateProps>;

// function updateUser(user: User) {
//   user.name = "new name";
//   //user.id = "133";//It'll show error because id is just a read only property.
// }

// let user1 = updateUser({
//   id: "newId",
//   name: "Aaditya",
//   age: 19,
//   email: "abc",
//   password: "123",
// });

//Another way to define Readonly for the whole object at once.
// const user1 :Readonly<User> = {

// }

//Record( used to define a cleaner type to objects in TS).

// interface User {
//   id: string;
//   name: string;
// }

// type Users = {
//   [key: string]: User;
// };

// type Users = Record<string, User>; //Cleaner syntax as compared to the one shown above.

// const users: Users = {
//   true: {
//     id: "abc",
//     name: "aaditya",
//   },
// };

// console.log(users);

//Map.

type User = {
  name: string;
  age: number;
  email: string;
};

//It's you choice to define the types of map at the time of defining it.Maps are objects too, they give u a set
//of getter & setters function to easily access & update the value of objects, unlike objects where u have to
//use a syntax like this ---  users["abc"][0].name.
// const users = new Map<string, User>();

// users.set("abc", { name: "Aaditya", age: 19, email: "abc@gmail.com" });

// users.set("xyz", { name: "Yash", email: "xyz@gmail.com", age: 17 });

// let Yash = users.get("xyz");
// let Aadi = users.get("abc");

// console.log(Yash);
// console.log(Aadi);

// type Evente = "click" | "scroll" | "mousemove";

// type eventType = Exclude<Evente, "mousemove">;

// const handleEvent = (event: eventType) => {
//   console.log(`Handle ${event}`);
// };

// let e1 = handleEvent("scroll");
// let e2 = handleEvent("click");
// let e3 = handleEvent("mousemove");//Here this will give error because we've excluded mousemove from Evente.
