import express from "express"
import {smscontroller, tokencontroller, verifysmscontroller } from "../controller/twilightcontroller.js";

const router=express.Router();
router.route("/twilight/token/:identity").get(tokencontroller);
router.route("/twilight/sms").post(smscontroller)
router.route("/twilio/sms/verify").post(verifysmscontroller)




export default router;