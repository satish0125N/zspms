import React from 'react';

const TaskList = ({ task }) => (
  <div className="space-y-4">
    
      <div key={task.id} className="bg-black p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{task.title.rendered}</h3>
        <div dangerouslySetInnerHTML={{ __html: task.content.rendered }} />
      </div>
  
  </div>
);

export default TaskList;