import React, { useState } from 'react';
import { Grid,Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Menu from '../components/Menu';
import Chatbox from '../components/Chatbox';

export default function Chat() {
  const [ menu, setMenu ] = useState(false);
  const [back, setBack] = useState(false);

  return (
    <Box w='100%' h='100vh'>
      <Grid w={'100%'} h='100%' mx='auto' gridTemplateColumns={{sm:'35% 65%',base:'100%'}}>
      <Box display={{sm:'flex',base:!back ? 'flex' : 'none'}} h='100%' maxH='100vh'>
        <Sidebar setBack={setBack} setMenu={setMenu} menu={menu}/>
      </Box>
      <Box h='100%' maxH='100vh' display={{sm:'flex',base:back ? 'flex' : 'none'}}>
        <Chatbox setBack={setBack}/>
      </Box>
      </Grid>
      {menu && <Menu setMenu={setMenu} menu={menu}/>}
    </Box>
  )
}