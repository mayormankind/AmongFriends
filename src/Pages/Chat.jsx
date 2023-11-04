import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Menu from '../components/Menu';
import Chatbox from '../components/Chatbox';

export default function Chat() {
  const [ menu, setMenu ] = useState(false);
  return (
    <Box w='100%' h='100vh'>
      <Flex w='100%' h='100%'>
        <Sidebar menu={menu} setMenu={setMenu}/>
        <Chatbox/>
      </Flex>
      {menu && <Menu setMenu={setMenu} menu={menu}/>}
    </Box>
  )
}