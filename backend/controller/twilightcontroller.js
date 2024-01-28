import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js"
import dotenv from "dotenv"
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};
import twilio from "twilio"

const accountsid=process.env.TWILIO_ACCOUNT_SID;
const api=process.env.TWILIO_API_KEY;
const apisecrect=process.env.TWILIO_API_SECRET;
const servicesid=process.env.TWILIO_SERVICE_SID;
const authtoken=process.env.TWILIO_AUTH_TOKEN




export const tokencontroller=catchasyncerror(async(req,res,next)=>{
    const identity=req.params.identity;
    // const accesstoken=new twilio.jwt.AccessToken(accountsid,api,apisecrect);
    // const chatgrant=new twilio.jwt.AccessToken.ChatGrant({
    //     serviceSid:servicesid,
    // });
    const accessToken=twilio.jwt.AccessToken;
    const ChatGrant=accessToken.ChatGrant;
    // accesstoken.addGrant(chatgrant);
    // accesstoken.identity=identity;
    const chatGrant=new ChatGrant({
        serviceSid:servicesid,
    })
    const token=new accessToken(
        accountsid,
        api,
        apisecrect,
        {identity:identity}
    );
    token.addGrant(chatGrant);
    const jwt=token.toJwt()
    res.status(200).json({
        token:jwt,
        identity:identity
    })
   
});



export const smscontroller=catchasyncerror(async(req,res,next)=>{
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    let client=new twilio(accountsid,authtoken)
// const client = require('twilio')(accountSid, authToken);
// console.log(client)

client.verify.v2.services('VA9f4161a15ca65a5ebddd8643c1d17631')
                .verifications
                .create({to: '+971558965920', channel: 'sms'})
                .then(verification => console.log(verification.status));

    res.status(200).json({
        success:true,
        message:"sms send successfully",
    })
})


export const verifysmscontroller=catchasyncerror(async(req,res,next)=>{
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    let client=new twilio(accountsid,authtoken)
// const client = require('twilio')(accountSid, authToken);
// console.log(client)

client.verify.v2.services('VA9f4161a15ca65a5ebddd8643c1d17631')
                .verificationChecks
                .create({to: '+971558965920', code: "953500"})
                .then(verification_check => console.log(verification_check.status));

    res.status(200).json({
        success:true,
        message:"sms send successfully",
    })
})

