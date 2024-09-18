import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("todo");

  const columns = [
    { id: "todo", title: "To-do", taskIds: [] },
    { id: "inProgress", title: "In-Progress", taskIds: [] },
    { id: "done", title: "Done", taskIds: [] },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://whether-app-woad.vercel.app/api/v1/Task/get"
        );
        const fetchedTasks = response.data.data; // Ensure this matches your API response

        // Map the fetched tasks to match your Kanban structure
        const formattedTasks = fetchedTasks.map((task) => ({
          id: task._id, // Use the correct identifier from the API response
          content: task.Title,
          status:
            task.Type === "Completed"
              ? "done"
              : task.Type === "In-Progress"
              ? "inProgress"
              : "todo", // Ensure this matches the status in your Kanban board
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDragEnd = async (taskId, newStatus) => {
    // Update local state
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Map newStatus to API expected values
    const apiStatus =
      newStatus === "done"
        ? "Completed" 
        : newStatus === "inProgress"
        ? "In-Progress"
        : "To-do";

    try {
      await axios.put(
        `https://whether-app-woad.vercel.app/api/v1/Task/Update/${taskId}`,
        {
          Type: apiStatus,
        }
      );

      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://whether-app-woad.vercel.app/api/v1/Task/delete/${taskId}`
      );
      if (response.status === 200) {
        alert("Task deleted successfully!");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        alert("Failed to delete the task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle(""); // Reset title on modal close
  };

  // Add task and call API
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() === "") {
      alert("Task title cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "https://whether-app-woad.vercel.app/api/v1/Task/create",
        {
          Title: newTaskTitle,
          Type: newTaskType === "done" ? "Completed" : "In-Progress",
        }
      );

      const newTask = {
        id: response.data._id, // Get the new task ID from the response
        content: newTaskTitle,
        status: newTaskType,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);

      closeModal();

      alert("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center">Kanban Board</h1>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onDragEnd={handleDragEnd}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add Task
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Task Modal"
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
          <form onSubmit={handleAddTask}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter task title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Type</label>
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
