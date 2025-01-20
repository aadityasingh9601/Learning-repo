import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Creating a function to insert some data.

async function insertUser(email: string, password: string, firstName: string) {
  const res = await prisma.user.create({
    data: { email, password, firstName },
  });

  console.log(res);
}

//insertUser("abc@gmail.com3", "secret3", "aaditya3");

//Get some data.

async function getUser(firstName: string) {
  const res = await prisma.user.findFirst({
    where: {
      firstName: firstName,
    },
    select: {
      id: true,
      firstName: true,
    },
  });

  console.log(res);
}

//getUser("aaditya3");

//INSERTING TODOS.

async function insertTodo(title: string, description: string, userId: number) {
  const res = await prisma.todo.create({
    data: { title, description, userId },
  });

  console.log(res);
}

//insertTodo("Sleep", "Sleep on time daily ", 2);

//Mark as done todo.

async function markAsDone(todoId: number) {
  const res = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      done: true,
    },
  });

  console.log(res);
}

//markAsDone(1);

//Delete a Todo.

async function deleteTodo(todoId: number) {
  const res = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });

  console.log(res);
}

deleteTodo(2);
