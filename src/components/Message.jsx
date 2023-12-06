import React, { useContext } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { ChatContext } from '../api/ChatContext';
import { Context } from '../api/Context';

export default function Message({message,owner}) {
  const { data } = useContext(ChatContext);
  const { user } = useContext(Context);
  const { colorMode } = useColorMode();
  const isDark = colorMode == 'dark';
  return (
    <Box borderRadius={owner=='sender' ? '10px 0 10px 10px' : '0 10px 10px 10px'} alignSelf={owner=='sender' ? 'end' : 'start'} w='fit-content' maxW='60%' bg={owner === 'receiver' ? isDark? 'black' : 'lightgray' : isDark ? 'purple' : 'purple.400'} p='10px'>{message}</Box>
  )
}
