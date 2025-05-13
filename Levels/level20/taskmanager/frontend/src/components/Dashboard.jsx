import React, { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [error, setError] = useState("");

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setError("Failed to load tasks");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date) {
      setError("All fields are required.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/tasks/${editTaskId}`, form);
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        await axios.post("http://localhost:5000/api/tasks", form);
      }

      setForm({ title: "", description: "", date: "" });
      fetchTasks();
    } catch (err) {
      console.error("Failed to save task:", err);
      setError("Failed to save task");
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      date: task.date ? task.date.substring(0, 10) : "",
    });
    setIsEditing(true);
    setEditTaskId(task._id);
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="dashboard">
      <h2>Task Master⚠️</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Date:{" "}
              {task.date ? new Date(task.date).toLocaleDateString() : "N/A"}
            </p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
