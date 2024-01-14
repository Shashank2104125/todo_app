import { useState,useEffect} from "react";
import AddTodo from "./AddTodo"
import TaskList from "./TaskList";
// const data=[
//   {id:0, title:'Buy Car', done:'true'},
//   {id:1, title:'Buy Car', done:'false'},
// ];
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) =>{ 
        setTodos(data)
      })
      .catch((error) => console.error("Error fetching data:", error));
    setInterval(()=>{
      fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) =>{ 
        setTodos(data)
      })
      .catch((error) => console.error("Error fetching data:", error));
    },1000)  
  }, []);

  function handleAddTodo(title) {
    const newTodo = {
      title: title,
      done: false,
    };
    if(newTodo.title.trim()===""){
      alert("Please fill the data");
    }else{
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.text())
      .catch((error) => console.error("Error:", error));
  }
}
  
  function handleChangeTodo(nextTodo){
   fetch("http://localhost:3000/",{
    method:"PUT",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nextTodo),
   })
   .then((response) => response.text())
   .catch((error) => console.error("Error:", error));
  }

  
  async function handleDeleteTodo(todoId) {
    try {
      const response = await fetch(`http://localhost:3000/?_id=${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // No need to include a body for DELETE requests
      });
  
      if (response.ok) {
        console.log("Deleting Successfully");
      } else {
        console.log("Error in Deleting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  


  

  return (
    <>
     <AddTodo onAddTodo={handleAddTodo}/>
     <TaskList
     todos={todos}
     onChangeTodo={handleChangeTodo}
     onDeleteTodo={handleDeleteTodo}
     />
    </>
  );
}

export default App;
