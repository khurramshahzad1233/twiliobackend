import express from "express";
import Errormiddleware from './middleware/error.js'
import twilight from "./routes/twilightroute.js"
import bodyParser from "body-parser";
import cors from 'cors'
import twilio from "twilio"
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())


app.use("/api",twilight);


app.use(Errormiddleware)
export default app;