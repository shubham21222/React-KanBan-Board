import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import axios from "axios";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import Button from "./common/Button";
import Spinner from "./common/Spinner";
import useTasks from "../hooks/useTasks";
import TaskForm from "./TaskForm";

Modal.setAppElement("#root");

const KanbanBoard = () => {
  const { tasks, setTasks, isLoading } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("todo");

  const columns = [
    { id: "todo", title: "To-do", taskIds: [] },
    { id: "inProgress", title: "In-Progress", taskIds: [] },
    { id: "done", title: "Done", taskIds: [] },
  ];

  const handleDragEnd = async (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

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
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://whether-app-woad.vercel.app/api/v1/Task/delete/${taskId}`
      );
      if (response.status === 200) {
        toast.success("Task deleted successfully!");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        toast.error("Failed to delete the task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred while deleting the task.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle("");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() === "") {
      toast.error("Task title cannot be empty");
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
        id: response.data._id,
        content: newTaskTitle,
        status: newTaskType,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      closeModal();
      toast.success("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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
            <Button
              onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add Task
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Add Task Modal"
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-16"
          >
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <TaskForm
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              newTaskType={newTaskType}
              setNewTaskType={setNewTaskType}
              handleAddTask={handleAddTask}
              closeModal={closeModal}
            />
          </Modal>
        </div>
      </DndProvider>
    </>
  );
};

export default KanbanBoard;
