import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

   useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form onSubmit={handleAddTask}>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      <div className="todo">
        {tasks.map((task) => (
          <div className="todo-item" key={task.id}>
            <input
              className="checkbox"
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <label htmlFor={`task-${task.id}`} className={task.completed ? 'completed' : ''}>
              {task.text}
            </label>
            <div className="todo-actions">
              <button
                className="submit-edits"
                onClick={() => {
                  const newText = prompt("Edit task:", task.text);
                  if (newText !== null) {
                    handleEditTask(task.id, newText);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="submit-edits"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



