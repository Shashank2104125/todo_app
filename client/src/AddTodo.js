import React, { useState } from 'react'

function AddTodo({onAddTodo}) {
    const [title,setTitle]=useState('');
  return (
    <>
    <input
    placeholder='Add Your Task'
    onChange={e=>setTitle(e.target.value)}  //catching the event onChange
    value={title}
    />
    <button
    onClick={()=>{
        setTitle('');
        onAddTodo(title)
    }}
    >
        Add
    </button>
    </>
  )
}

export default AddTodo
