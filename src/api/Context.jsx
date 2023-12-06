import { onAuthStateChanged } from "firebase/auth";
import React,{createContext,useState,useEffect} from "react";
import { auth } from "./firebase";

export const Context = createContext(null);

const ContextClass = ({children}) =>{
  const [user,setUser] = useState({});

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(res)=>{
        setUser(res)
    });
    return ()=>{
      unsub()
    }
  },[])
return (
  <Context.Provider value={{user,setUser}}>
    {children}
  </Context.Provider>
  )
}
//1:37:07
export default ContextClass ;
