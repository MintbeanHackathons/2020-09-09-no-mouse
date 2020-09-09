import React, { useState } from "react";
import "./styles/index.css";
import { KeyMap } from "./components/KeyMap";
import { HotKeys } from "react-hotkeys";

const generateBlankTodo = () => ({
  title: "",
  description: "",
});

const defaultItems = [
  {
    title: "Buy milk",
    description: "Oat milk is better, but Almond milk will do.",
  },
  {
    title: "Buy eggs",
    description: "Kinder eggs or Cadbury mini eggs only.",
  },
  {
    title: "Buy oranges.",
    description:
      "A couple of them. Gold or ochre is good, if they have them in stock. I'll settle for goldenrod.",
  },
];

function App() {
  const [todos, setTodos] = useState(defaultItems);
  const [newTodo, setNewTodo] = useState(generateBlankTodo());

  const deleteTodo = (todoIndex) => {
    const newTodos = todos.filter((t, index) => index !== todoIndex);
    setTodos(newTodos);

    // blur the element to prevent a subtle bug
    document.activeElement.blur();
  };

  const updateForm = (field, evt) => {
    const updatedTodo = { ...newTodo };
    updatedTodo[field] = evt.target.value;
    setNewTodo(updatedTodo);
  };

  const createTodo = (evt) => {
    evt.preventDefault();
    if (!newTodo.title || !newTodo.description) {
      alert("Both title and description must be filled out.");
      return;
    }
    setTodos([...todos, newTodo]);
    setNewTodo(generateBlankTodo());
  };

  return (
    <KeyMap>
      <div className="container">
        <h1>Mouseless Todos</h1>
        <p>
          Tab to move down. <br />
          Shift+Tab to move up. <br />
          Delete OR backspace to delete an item
        </p>
        <div className="todos">
          {todos.map((todo, index) => (
            <HotKeys handlers={{ DELETE: () => deleteTodo(index) }} key={index}>
              <div className="todo-item" tabIndex={index + 1}>
                <div className="title">{todo.title}</div>
                <div className="description">{todo.description}</div>
                <div
                  className="delete-button"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </div>
              </div>
            </HotKeys>
          ))}
          <div className="new-todo-item">
            <h3>Create item</h3>
            <form onSubmit={(evt) => createTodo(evt)}>
              <div>
                <label>
                  Title
                  <br />
                  <input
                    value={newTodo.title}
                    onChange={(evt) => updateForm("title", evt)}
                  ></input>
                </label>
              </div>
              <div>
                <label>
                  Description
                  <br />
                  <textarea
                    value={newTodo.description}
                    onChange={(evt) => updateForm("description", evt)}
                  ></textarea>
                </label>
              </div>
              <input type="submit"></input>
            </form>
          </div>
        </div>
      </div>
    </KeyMap>
  );
}

export default App;
