import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ""
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleEditChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          {task.dueDate && (
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          )}
          <p>Status: {task.completed ? "✅ Completed" : "⏳ Incomplete"}</p>
          <div className="task-actions">
            <button onClick={() => onToggleComplete(task._id)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
