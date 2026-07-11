import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/addtask.css'
export default function AddTask(){

    const [taskData,setTaskData]=useState({});
    const navigate = useNavigate();

    const handelAddTask= async (e)=>{
        e.preventDefault();
        let result = await fetch('http://localhost:3200/add',{
            method:'Post',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'Application/Json'
            }
        })
        result = await result.json()
        if(result.success){
            navigate("/")
        }
    }

    return(
        <div  className="container">
            <h1>Add New Task</h1>
                <label htmlFor="title">Title</label>
                <input onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title" placeholder="Enter task title" id="title" />
                <label htmlFor="description">Description</label>
                <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter Task Description" id="description"></textarea>
                <button onClick={handelAddTask} className="submit">Add New Task</button>
        </div>
    )
}