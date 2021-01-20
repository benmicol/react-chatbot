import {INPUT_SUCCESS, INPUT_FAIL, SESSION_FAIL, SESSION_SUCCESS, MESSAGE_FAIL, MESSAGE_SUCCESS} from "./types"

import axios from "axios"

export const userMessage = (message) => async (dispatch) =>{
    try{
        dispatch({type:INPUT_SUCCESS, payload:message})
    }catch (err) {
        dispatch({type: INPUT_FAIL})
    }
}

export const createSession = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/watson/session");
      dispatch({ type: SESSION_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: SESSION_FAIL });
    }
  };

export const sendMessage = (message) => async (dispatch) =>{
    try{
        const body = {input:message}
        const res = axios.post("/api/watson/message", body)
        dispatch({type:MESSAGE_SUCCESS, payload:(await res).data.output.generic[0].text})
    }catch(err){
        dispatch({type:MESSAGE_FAIL})
    }
}