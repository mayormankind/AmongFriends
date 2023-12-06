import React,{ useContext } from 'react';
import {
  ChakraProvider, Grid
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Message from './components/Message';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Chat from './Pages/Chat';
import theme from './chakra';
import { Context } from './api/Context';

function App() {
  const { user } = useContext(Context);

  const Routing = ({children}) => {
    if(user){
      return children
      console.log(user)
    }
    return <Navigate to={'/login'}/>
  }
  
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route index element={<Routing><Chat/></Routing>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/signup'} element={<Signup/>}/>
          {/* <Route path={'/message'} element={<Message/>}/> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;