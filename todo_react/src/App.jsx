import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([{
    title: 'Go to gym',
    description: 'Go to gym from 3-7',
    completed: false
  },
  {
    title: 'Stduy DSA',
    description: 'Stduy DSA from 9-100',
    completed: true
  }])

  function addTodo(){
    setTodos([...todos, {
      title: 'New Todo',
      description: 'New desc'
    }])
  }
  return (
      <div> 
          <button onClick={addTodo}>Add Todo</button>

        {todos.map(todo => {
          return <Todo title={todo.title} description={todo.description}/>
        })}
      </div>
      
  )
}

function Todo(props){
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </div>
  )
}

export default App;
