import React, {useState, useEffect, useRef} from 'react'
import {connect} from "react-redux"
//Import Action
import {userMessage, sendMessage} from "../../actions/watson"

const Chat = ({chat, userMessage, sendMessage}) => {
    //Handle User Messages
    const [message, setMessage] = useState("")
    //Smooth Scrolling To Bottom
    const endOfMessages = useRef(null)
    const scrollToBottom = () =>{
        endOfMessages.current.scrollIntoView({behavior: "smooth"})
    }
    useEffect(scrollToBottom,[chat])
    //Handle User Submission
    const handleClick = async (e) =>{
        const code = e.keyCode || e.which
        if (code === 13) {
            console.log(message)
            userMessage(message)
            sendMessage(message)
            setMessage("")
        }
    }
    return (
        <div className="chat">
            <h1>Chatty the chatbot</h1>
            <div className="historyContainer">
            {chat.length===0 ? "" : chat.map(msg=><div className={msg.type}>{msg.message}</div>)}
            <div ref={endOfMessages}></div>
            </div>
            <input id="chatbox" onChange={(e)=>setMessage(e.target.value)} onKeyPress={handleClick} value={message}></input>
        </div>
    )
}
const mapStateToProps = (state) =>({
    chat: state.watson.messages,
})

export default connect( mapStateToProps, {userMessage, sendMessage})(Chat)
