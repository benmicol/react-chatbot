import React, {useState} from 'react'

const Chat = () => {
    const [message, setMessage] = useState("")
    const handleClick = async (e) =>{
        const code = e.keyCode || e.which
        if (code === 13) {
            console.log(message)
            setMessage("")
        }
    }
    return (
        <div className="chat">
            <h1>Chatty the chatbot</h1>
            <div>Messages go here</div>
            <input id="chatbox" onChange={(e)=>setMessage(e.target.value)} onKeyPress={handleClick} value={message}></input>
        </div>
    )
}

export default Chat
