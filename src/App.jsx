import { useState } from "react";
import { FaTrash } from "react-icons/fa6";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const todolist = todos.length;
  const todoChecked = todos.filter((todo) => todo.checked).length;
  const percentage = Math.round((todoChecked / todolist) * 100);

  let sortedTodos = todos;

  if (sortBy === "all") {
    sortedTodos = todos;
  } else if (sortBy === "complete") {
    sortedTodos = todos.filter((todo) => todo.checked); // Show only completed
  } else if (sortBy === "incomplete") {
    sortedTodos = todos.filter((todo) => !todo.checked); // Show only incomplete
  }

  const handleCheckedItem = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Fix: Invoke preventDefault
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, checked: false }, // Add todo as an object
      ]);
      setNewTodo("");
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleclearlist = () => {
    const confirmed = window.confirm(
      "Are you Certain it should be cleared?"
    );
    if (confirmed) setTodos([]);
  };

  return (
    <div>
      <h1 className="text-textcolor text-center p-10 text-2xl font-bold">
        My To-Do List
      </h1>
      <div className="flex flex-col items-baseline w-9/12 mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="flex gap gap-4 items-center w-full"
        >
          <input
            type="text"
            className="p-2 w-8/12 my-5 border border-gray-300 rounded-md"
            placeholder="What to do"
            value={newTodo}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-active p-2 rounded-md text-white cursor-pointer"
          >
            Add Task
          </button>
          <select
            value={sortBy}
            className="w-36 px-4 py-2 items-end my-2 rounded-md outline-none"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="all">All</option>
            <option value="complete">Completed</option>
            <option value="incomplete">InComplete</option>
          </select>
        </form>

        <ul className="h-auto">
          {sortedTodos.map((todo) => (
            <li
              key={todo.id}
              className="text-xl mb-4 flex items-center capitalize "
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={todo.checked} // Correctly map `checked` state
                onChange={() => handleCheckedItem(todo.id)}
              />
              <span
                className={`block ${
                  todo.checked ? "line-through text-red-600" : ""
                } max-w-xs truncate`}
                title={todo.text} // Shows full text on hover
              >
                {todo.text}
              </span>
              <button
                className="bg-red-500 p-2 rounded-md text-white cursor-pointer ml-2"
                onClick={() => removeTodo(todo.id)}
              >
                <FaTrash className="text-xs" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-baseline gap-4">
        {!todos.length ? (
          <p className="text-center mt-4 capitalize">
            {" "}
            Create a list To get Started{" "}
          </p>
        ) : (
          <p className="text-center mt-4 capitalize">
            {percentage === 100
              ? "Completed task congrats"
              : `
        You have ${todolist} ${
                  todolist === 1 ? "Task" : "Tasks"
                } on your list, and accomplished ${todoChecked} task on your list
        (${percentage}%)done`}
          </p>
        )}
        {todos.length ? (
          <button
            onClick={handleclearlist}
            className="bg-red-600 p-2 rounded-md"
          >
            Clear
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
