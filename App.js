import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('open');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    setTasks([...tasks, { task: newTask, assignee: assignee, status: status }]);
    setNewTask('');
    setAssignee('');
    setStatus('open');
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].task);
    setAssignee(tasks[index].assignee);
    setStatus(tasks[index].status);
  };

  const handleUpdateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = { task: newTask, assignee: assignee, status: status };
    setTasks(updatedTasks);
    setNewTask('');
    setAssignee('');
    setStatus('open');
    setEditIndex(-1);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleUpdateStatus=(index,newStatus)=>{
    const updatedTasks=[...tasks];
    updatedTasks[index].status=newStatus;
    setTasks(updatedTasks);
  }
  return (
    <div className="app">
      <h1>Project Management App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assign to"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {editIndex === -1 ? (
          <button onClick={handleAddTask}>Add Task</button>
        ) : (
          <button onClick={handleUpdateTask}>Update Task</button>
        )}
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div className="task-info">
              <h2>{task.task}</h2>
              <p>Assigned to: {task.assignee}</p>
              <p>Status: {task.status}</p>
            </div>
            <div className="task-actions">
              {task.status !== 'completed' && (
                <>
                  {task.status === 'open' && (
                    <button onClick={() => handleUpdateStatus(index, 'In Progress')}>
                      Start
                    </button>
                  )}
                  {task.status === 'In Progress' && (
                    <button onClick={() => handleUpdateStatus(index, 'Completed')}>
                      Completed
                    </button>
                  )}
                </>
              )}
              <button onClick={() => handleEditTask(index)}>Edit</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;