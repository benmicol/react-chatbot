//Import Dependencies
const express = require("express")
const router = express.Router()
const AssistantV2 = require("ibm-watson/assistant/v2")
const { IamAuthenticator } = require("ibm-watson/auth")

//Create Instance of Assistant
//Authenticate
const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
})
//Connect to assistant
const assistant = new AssistantV2({
    version: "2019-02-28",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL,
})
//Route to handle session tokens
router.get("/session", async (req, res) => {
    try{
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        })
        res.json(session['result'])
    }catch(err){
        res.send("There was an error processing your request.")
        console.log(err)
    }
})
//Route to handle messages
router.post("/message", async (req,res) => {
    //Construct payload
    payload = {
        assistantId: process.env.WATSON_ASSISTANT_ID,
        sessionId: req.headers.session_id,
        input:{
            message_type: "text",
            text: req.body.input,
        }
    }
    try{
        const message = await assistant.message(payload)
        res.json(message["result"])
    }catch(err){
        res.send("There was an error processing your request.")
        console.log(err)
    }
})
//Export Routes
module.exports = router