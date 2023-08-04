import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Search from './components/Search';
import Message from './components/Message';
import Login from './components/Login';
import Chats from './components/Chats';

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
      {/* <Box textAlign="center" fontSize="xl"> */}
        {/* <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end"/>
        </Grid>
      </Box> */}
    </ChakraProvider>
  );
}

export default App;