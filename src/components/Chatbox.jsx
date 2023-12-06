import { Flex, Text, Box, Avatar, IconButton } from '@chakra-ui/react';
import React,{ useState, useContext } from 'react';
import { RiGridFill } from 'react-icons/ri';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';
import MessageBox from './MessageBox';
import Navigation from './Navigation';
import Messages from './Messages';
import Timer from './Timer';
import { Link } from 'react-router-dom';
import { ChatContext } from '../api/ChatContext';

export default function Chatbox() {
  const [ timer, setTimer ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ time, setTime ] = useState();
  const [ file, setFile ] = useState(null);
  const { data } = useContext(ChatContext);
  return (
      <Box flex={{sm:'2',base:'1'}} h='100%' w='100%' display={{sm:'flex',base:'none'}} flexDir='column'>
        <Flex bg='#070722' align='center' justify='space-between' w='100%' p='10px' h='10%'>
          <Link to='/chats'>
            <IconButton display={{sm:'none',base:'flex'}} variant='ghost' color='white' icon={<FaArrowLeft/>}/>
          </Link>
          {/* <Avatar src={data.photoURL} boxSize='40px' mr='10px'/>
          <Box w='100%'>
            <Text color='white'>{data.user?.displayName}</Text>
            <Text fontSize='small' color='gray'>last seen at 3:00 ...</Text>
          </Box> */}
          <Avatar src='images/2.jpg' boxSize='40px' mr='10px'/>
          <Box w='100%'>
            <Text color='white'>{data.Info.displayName}</Text>
            <Text fontSize='small' color='gray'>last seen at 3:00 ...</Text>
          </Box>
          <IconButton icon={<RiGridFill/>} variant={'ghost'} fontSize='24px'/>
        </Flex>
        <Messages/>
        <MessageBox setTimer={setTimer} setTime={setTime} timer={timer} time={time} message={message} setMessage={setMessage} setFile={setFile} file={file}/>
        {timer && <Timer setTime={setTime} time={time} setTimer={setTimer}/>}
      </Box>
  )
}