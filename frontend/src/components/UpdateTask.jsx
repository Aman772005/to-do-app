import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UpdateTask() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [task, setTask] = useState({});

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {

        const response = await fetch(`http://localhost:3200/task/${id}`)

        const data = await response.json();

        setTask(data);
    }

    const updateTask = async () =>{
        const response = await fetch(`http://localhost:3200/update/${id}`,
            {
                method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            }
        );
        const data = await response.json();

        if(data.success){
            navigate("/")
        }
    }

    console.log(id);

return (
    <div>
        <h1>Update Task</h1>

        <input
            type="text"
            value={task.title || ""}
            onChange={(e) =>
                setTask({
                    ...task,
                    title : e.target.value
                })
            }
        />

        <textarea
            value={task.description || ""}
            onChange={(e)=>
                setTask({
                    ...task,
                    description:e.target.value
                })
            }
        />

        <button onClick={updateTask}>Update</button>
    </div>
);
};
