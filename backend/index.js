import express from "express";
import {connection} from "./dbconfig.js"
import cors from 'cors';
import { ObjectId } from "mongodb";

const app = express();

app.use(express.json());
app.use(cors());

let db ;

async function start(){

    db = await connection();

    app.get("/",(req,res)=>{
    res.send("Server Started");
    });

    app.post("/add",async (req,res)=>{
    await db.collection("user").insertOne(req.body);
    res.json({
        success: true
    });
    });

    app.get("/task/:id",async(req,res)=>{
        const id = req.params.id;
        const task = await db.collection("user").findOne({
            _id: new ObjectId(id)
        });
        res.send(task)
    });

    app.get("/tasks",async(req,res)=>{
       const tasks =  await db.collection("user").find().toArray();
        console.log(tasks);
        res.send(tasks);
    });

    app.put("/update/:id",async(req,res)=>{

        console.log("PUT route called");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

        const id = req.params.id ;
        const updateTask = req.body ;

        await db.collection("user").updateOne(
            {
                _id:new ObjectId(id)
            },
            {
                $set: {
                    title : req.body.title,
                    description:req.body.description
                }
            }
        );
        res.json({
            success:true
        })
    });

    app.delete("/delete/:id",async(req,res)=>{
        
        const id = req.params.id;
        await db.collection("user").deleteOne(
            {
                _id:new ObjectId(id)
            }
        )
        res.json({
            success:true
        });
        
    })

    app.listen(3200,()=>{
    console.log("sever is working on 3200")
    });

}

start();
// to do app 
