import React from "react";
import EditSVG from "../svg/EditSVG";

export default function Task(props) {
  function checked() {
    console.log("you clicked the checkbox!");
  }

  async function handleEditClick() {
    const task = await props.getTask(props.id);
    props.setEditPageTask(task);
    props.setShowEditPage(true);
  }

  //render
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          size="40rem"
          onClick={() => props.deleteTask(props.id)}
          className="cursor-pointer"
        />
        <p className="font-light">{props.name}</p>
      </div>
      <button onClick={handleEditClick}>
        <EditSVG />
      </button>
    </div>
  );
}
