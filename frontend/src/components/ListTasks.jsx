import { useEffect, useState } from "react"
import '../style/ListTasks.css'
import { Navigate, useNavigate } from "react-router-dom";

export default function List() {

    const [taskData, setTaskData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getListData();
    }, [])

    const getListData = async () => {
        let response = await fetch('http://localhost:3200/tasks')
        let data = await response.json();

        setTaskData(data);

    }

    const deleteTask = async(id)=>{
        console.log("Delete clicked")
        console.log(id)
        let response = await fetch(`http://localhost:3200/delete/${id}`,{
            method:"DELETE"
        });
        const data = await response.json();
        if(data.success){
            getListData();
        }
    }

    const editTask = (id) =>{
        navigate(`/update/${id}`);
    }

    return (
        <div>
            <h1>To Do List</h1>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {taskData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => editTask(item._id)}>Edit</button>
                                <button onClick={() => deleteTask(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}