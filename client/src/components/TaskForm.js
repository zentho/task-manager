import React from "react";

export default function TaskForm(props) {
  // useStates
  const [newTask, setNewTask] = React.useState({
    name: "",
    status: false,
  });

  // CRUD FUNCTIONS

  // @desc post a task
  async function postTask(newTask) {
    const response = await fetch(`http://localhost:3001/api/v1/tasks/`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const task = await response.json();
    return task;
  }

  // GENERAL FUNCTIONS

  async function handleSubmit() {
    await postTask(newTask);
    setNewTask({ name: "", status: false });
    props.setShowAddSection(false);
    props.refreshTasks();
  }

  return (
    <div className="">
      <input
        type="text"
        className="p-4 mb-4 h-8 max-w-sm border-2 border-solid border-white rounded-md bg-[#142546]"
        onChange={(e) => setNewTask({ name: e.target.value, status: false })}
        value={newTask.name}
      ></input>
      <div className="flex gap-4">
        <button onClick={handleSubmit} className="bg-white font-medium rounded-sm text-[#142546] px-2">
          submit
        </button>
        <button onClick={() => props.setShowAddSection(false)}>cancel</button>
      </div>
    </div>
  );
}
