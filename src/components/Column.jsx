import React from 'react'
import { useDrop } from 'react-dnd'
import Task from './Task'

const Column = ({ column, tasks, onDragEnd, onDelete }) => {
  const [, drop] = useDrop(() => ({
    accept: 'task',
    drop: () => ({ status: column.id }),
  }))

  return (
    <div ref={drop} className="bg-gray-100 p-4 rounded-lg shadow flex-1 min-w-[250px]">
      <h2 className="font-bold mb-4">{column.title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDragEnd={onDragEnd} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Column
