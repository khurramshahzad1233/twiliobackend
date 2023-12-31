import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js"
import dotenv from "dotenv"
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};
import axios from "axios";
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

let client=new twilio(accountsid,authtoken)

// export const chatcontroller=catchasyncerror(async(req,res,next)=>{

//     console.log("received a webhook", req.body);
//     if(req.body.EvenType==="onConversationAdded"){
//         const me="Tackleton";
//         client.conversations.v1.conversations(req.body.conversationsid).participants.create({
//             identity:me
//         }).then(participant=>)
//     }

// })


