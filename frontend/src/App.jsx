import './style/App.css'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import ListTasks from './components/ListTasks'
import UpdateTask from './components/UpdateTask'

function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<ListTasks/>}/>
      <Route path='/add' element={<AddTask/>}/>
      <Route path='/update/:id' element={<UpdateTask/>} />
    </Routes>
    </>
  )
}

export default App
