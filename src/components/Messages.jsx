import React from 'react';
import { Box, Flex, useColorMode } from '@chakra-ui/react';
import Message from './Message';

export default function Messages() {
  const { colorMode } = useColorMode();
  const isDark = colorMode == 'dark';
  return (
    <Flex gap='10px' flexDir='column' p='10px' w='100%' h='80%' overflowY='scroll' bg='#515185'>
        <Message message={'Hello Boss'} owner='receiver'/>
        <Message message={'Oga mi bawo ni?'} owner='sender'/>
        <Message message={'I dey ooo. Na your face we dey look like this'} owner='receiver'/>
        <Message message={'Dey play my fans'} owner='sender'/>
        <Message message={'No dey do your boy like this na'} owner='receiver' />
        <Message message={'How things na?'} owner='sender'/>
        <Message message={'Good ooo. All thanks to God'} owner='receiver'/>
        <Message message={'Hello Boss'} owner='receiver'/>
        <Message message={'Oga mi bawo ni?'} owner='sender'/>
        <Message message={'I dey ooo. Na your face we dey look like this. I dey ooo. Na your face we dey look like this. I dey ooo. Na your face we dey look like this'} owner='receiver'/>
        <Message message={'Dey play my fans'} owner='sender'/>
        <Message message={'No dey do your boy like this na'} owner='receiver' />
        <Message message={'How things na?'} owner='sender'/>
        <Message message={'Good ooo. All thanks to God'} owner='receiver'/>
    </Flex>
  )
}
