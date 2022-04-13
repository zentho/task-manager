import "./App.css";
import React from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import PlusSVG from "./svg/PlusSVG";

// fetch tasks from the backend
//render all of them here with option to edit them an delete etc
// create a task card component
// see if it works on local
// if time, fix the errors on backend (find tutorials on express backend error handling)
// deploy to heroku

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [showEditPage, setShowEditPage] = React.useState(false);
  const [editPageTask, setEditPageTask] = React.useState("no editPageTask yet");
  const [editNameToSubmit, setEditNameToSubmit] = React.useState("");
  const [showAddSection, setShowAddSection] = React.useState(false);

  console.log(editNameToSubmit);

  // CRUD FUNCTIONS

  // @desc get all tasks
  React.useEffect(() => {
    fetch("/api/v1/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  // @desc delete a task
  async function deleteTask(id) {
    await fetch(`/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
    const newTasks = tasks.filter((el) => el._id !== id);
    setTasks(newTasks);
  }

  // @desc get a task
  async function getTask(id) {
    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: "GET",
    });
    const task = await response.json();
    return task;
  }

  // @desc update a task
  async function updateTask(id, newName) {
    console.log(newName);
    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const task = await response.json();
    return task;
  }

  // GENERAL FUNCTIONS

  function handleAddButtonClick() {
    setShowAddSection((prev) => !prev);
  }

  function handleEditTyping(text) {
    setEditNameToSubmit(text);
  }

  async function handleEditSubmit() {
    await updateTask(editPageTask._id, editNameToSubmit);

    await refreshTasks();

    setShowEditPage(false);
    setEditNameToSubmit("");
  }

  async function refreshTasks() {
    const response = await fetch(`/api/v1/tasks/`, {
      method: "GET",
    });
    const tasks = await response.json();
    setTasks(tasks);
  }

  // HTML RENDER
  return (
    <div className="max-w-6xl mx-auto my-16">
      {showEditPage ? (
        <div className="flex flex-col items-center gap-4">
          <p className="font-light">new task name:</p>
          <input
            type="text"
            className="p-4 h-8 w-96 border-2 border-solid border-white rounded-md bg-[#142546]"
            placeholder={editPageTask.name}
            onChange={(e) => handleEditTyping(e.target.value)}
            value={editNameToSubmit}
          ></input>
          <div className="flex gap-4">
            <button
              onClick={handleEditSubmit}
              className="bg-white font-medium rounded-sm text-[#142546] px-2"
            >
              submit
            </button>
            <button
              className="font-light"
              onClick={() => {
                setShowEditPage(false);
                setShowAddSection(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mb-2 text-4xl font-bold">Today</h1>
          <div className="flex flex-col gap-[0.2rem] mb-8">
            {tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                name={task.name}
                status={task.status}
                deleteTask={deleteTask}
                getTask={getTask}
                setShowEditPage={setShowEditPage}
                setEditPageTask={setEditPageTask}
              />
            ))}
          </div>

          <hr className="mb-4" />
          <button onClick={handleAddButtonClick} className="mb-12">
            <PlusSVG />
          </button>
          {showAddSection && <TaskForm refreshTasks={refreshTasks} setShowAddSection={setShowAddSection} />}
        </div>
      )}
    </div>
  );
}

export default App;
