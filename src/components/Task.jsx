import React from 'react'
import { useDrag } from 'react-dnd'

const Task = ({ task, onDragEnd, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onDragEnd(item.id, dropResult.status)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))


  return (
    <div
      ref={drag}
      className={`p-4 mb-2 rounded-lg shadow-sm cursor-move flex justify-between items-center ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${getTaskColor(task.status)}`}
    >
      <span>{task.content}</span>
      <button
        className="text-red-500 ml-2"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  )
}

// Helper function to get task color based on status
const getTaskColor = (status) => {
  switch (status) {
    case 'todo':
      return 'bg-yellow-200 hover:bg-yellow-300'
    case 'inProgress':
      return 'bg-blue-200 hover:bg-blue-300'
    case 'done':
      return 'bg-green-200 hover:bg-green-300'
    default:
      return 'bg-gray-200 hover:bg-gray-300'
  }
}

export default Task


