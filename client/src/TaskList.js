import React, { useState } from 'react'

export default function TaskList({
    todos,
    onChangeTodo,
    onDeleteTodo
}) {
  return (
    <ul>
        {todos.map(todo=>(
           <li>
            <Task
             todo={todo}
             onChange={onChangeTodo}
             onDelete={onDeleteTodo}
            />
           </li> 
        ))}
    </ul>
  )
};

function Task({todo,onChange,onDelete}){
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);
  
    let todoContent;
  
    if (isEditing) {
      todoContent = (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button
            onClick={() => {
              onChange({
                ...todo,   ///... use to maintain the data as it is
                title: editedTitle,
              });
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </>
      );
    } else {
      todoContent = (
        <>
          {todo.title}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      );
    }

    return(
        <label>
            <input
            type='checkbox'
            checked={todo.done}
            onChange={e=>{
                onChange({
                    ...todo,
                    done:e.target.checked
                })
            }}
            />
            {todoContent}
        <button onClick={()=>onDelete(todo._id)}>
         Delete
        </button>
        </label>
    )
}
