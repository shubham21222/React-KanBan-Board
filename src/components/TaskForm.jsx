import React from "react";
import PropTypes from "prop-types";
import Button from "./common/Button";
import InputField from "./common/InputField";

const TaskForm = ({
  newTaskTitle,
  setNewTaskTitle,
  newTaskType,
  setNewTaskType,
  handleAddTask,
  closeModal,
}) => (
  <form onSubmit={handleAddTask}>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Task Title</label>
      <InputField
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)} // Correct usage of onChange
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
      <Button
        type="button"
        onClick={closeModal}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-4"
      >
        Cancel
      </Button>
      <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Add Task
      </Button>
    </div>
  </form>
);

TaskForm.propTypes = {
  newTaskTitle: PropTypes.string.isRequired,
  setNewTaskTitle: PropTypes.func.isRequired,
  newTaskType: PropTypes.string.isRequired,
  setNewTaskType: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default TaskForm;
