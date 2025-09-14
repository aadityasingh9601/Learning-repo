import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Todo() {
  const [todos, setTodos] = useState([
    { task: "sample task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState(""); //To detect the value of input.
  let updateTodoValue = (event) => {
    setNewTodo(event.target.value); //Using event object to access the input's value and
    //updating it in our newTodo, that triggers re-render causing u to see the entered
    //value.That is u r actually seeing the value of newTodo, after updation and re-rendering
    //not the value u r just typing.
  };

  let addNewTodo = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  let deleteTask = (id) => {
    setTodos((prevTodos) => {
      return todos.filter((todo) => todo.id != id);
    });
  };

  let toUppercaseAll = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      });
    });
  };

  let toUppercaseOne = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, task: todo.task.toUpperCase() };
        } else {
          return todo;
        }
      });
    });
  };

  let markDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, isDone: !todo.isDone }; //Adding toggle functionalities.
        } else {
          return todo;
        }
      });
    });
  };

  return (
    <div>
      <input
        placeholder="Add a task"
        value={newTodo}
        onChange={updateTodoValue}
      ></input>
      <button onClick={addNewTodo}>Add</button>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      <h2>Tasks to be done</h2>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                }}
              >
                {todo.task}
              </span>
              &nbsp;&nbsp;&nbsp;
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
              &nbsp;&nbsp;&nbsp;
              {todo.isDone ? (
                <button onClick={() => markDone(todo.id)}>Unmark</button>
              ) : (
                <button onClick={() => markDone(todo.id)}>Mark as done</button>
              )}
            </li>
          );
        })}
      </ul>
      <br></br>
      <br></br>
      <hr></hr>
      <button onClick={toUppercaseAll}>Uppercase all</button>
    </div>
  );
}

export default Todo;
