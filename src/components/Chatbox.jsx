import { Flex, Text, Box, Avatar, IconButton } from '@chakra-ui/react';
import React,{ useState, useContext } from 'react';
import { RiGridFill } from 'react-icons/ri';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';
import MessageBox from './MessageBox';
import Messages from './Messages';
import Timer from './Timer';
import { ChatContext } from '../api/ChatContext';

export default function Chatbox({setBack}) {
  const [ timer, setTimer ] = useState(false);
  const [ time, setTime ] = useState(0);
  const { data } = useContext(ChatContext);
  return (
      <Box h='100%' w='100%' flexDir='column'>
        <Flex bg='#070722' align='center' justify='space-between' w='100%' p='10px' h='10%'>
            <IconButton display={{sm:'none',base:'flex'}}  variant='ghost' color='white' icon={<FaArrowLeft/>} onClick={()=>setBack(false)}/>
          <Avatar src={data.user?.photoURL} boxSize='40px' mr='10px'/>
          <Box w='100%'>
            <Text color='white' textTransform='capitalize'>{data.user?.displayName}</Text>
            <Text fontSize='small' color='gray'>last seen at 3:00 ...</Text>
          </Box>
          <IconButton icon={<RiGridFill/>} variant={'ghost'} fontSize='24px'/>
        </Flex>
        <Messages/>
        <MessageBox setTimer={setTimer} setTime={setTime} timer={timer} time={time}/>
        {timer && <Timer setTime={setTime} time={time} setTimer={setTimer}/>}
      </Box>
  )
}