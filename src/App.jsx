import React from 'react';
import {
  ChakraProvider, Grid
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Search from './components/Search';
import Message from './components/Message';
import Login from './components/Login';
import Chats from './components/Chats';
import theme from './chakra';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path={'/search'} element={<Search/>}/>
          <Route path={'/chats'} element={<Chats/>}/>
          <Route path={'/message'} element={<Message/>}/>
        </Routes>
      </Router>
          {/* <ColorModeSwitcher justifySelf="flex-end"/> */}
    </ChakraProvider>
  );
}

export default App;