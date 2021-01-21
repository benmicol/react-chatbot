import React, {useEffect} from "react";
import './App.css';
//Import Redux Components
import {Provider} from "react-redux"
import store from "./store"
//Import Chat
import Chat from "./components/chat/Chat"
//Import Action
import {createSession} from "./actions/watson"
//Import Axios
import axios from "axios"

//Store session
if(localStorage.session){
  delete axios.defaults.headers.common["session_id"];
  axios.defaults.headers.common["session_id"] = localStorage.session
}else{
  delete axios.defaults.headers.common["session_id"]
}
//Connect App to Redux
const App = () => {
  useEffect(()=>{
    if(!localStorage.session){
      store.dispatch(createSession())
    }
  })
  return (
    <Provider store={store}>
    <div className="container">
      <Chat />
    </div>
    </Provider>
  );
}

export default App;
