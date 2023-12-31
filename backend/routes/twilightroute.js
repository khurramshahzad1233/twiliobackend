import express from "express"
import {tokencontroller } from "../controller/twilightcontroller.js";

const router=express.Router();
router.route("/twilight/token/:identity").get(tokencontroller);




export default router;