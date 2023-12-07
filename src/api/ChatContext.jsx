import { onAuthStateChanged } from "firebase/auth";
import React,{ createContext, useContext, useReducer } from "react";
import { auth } from "./firebase";
import { Context } from "./Context";

export const ChatContext = createContext(null);

const ChatContextClass = ({children}) =>{
  const { user } = useContext(Context);
  const CURRENT_STATE ={
    chatId: 'null',
    user: {}
  }
  
  const ChatReducer=(state,action)=>{
    switch(action.type){
      case "SWITCH_USER":
        return{
          user: action.payload,
          chatId: user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid
        }
      default:
        return state;
      }
  }
  const [state, dispatch] = useReducer(ChatReducer,CURRENT_STATE)
return (
  <ChatContext.Provider value={{data:state,dispatch}}>
    {children}
  </ChatContext.Provider>
  )
}

export default ChatContextClass ;
