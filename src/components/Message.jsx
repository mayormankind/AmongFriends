import { Flex, Text, Box, Avatar, IconButton } from '@chakra-ui/react';
import React,{ useState } from 'react';
import { RiGridFill } from 'react-icons/ri';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';
import MessageBox from './MessageBox';
import Navigation from './Navigation';
import Timer from './Timer';
import { Link } from 'react-router-dom';

export default function Message() {
  const [ timer, setTimer ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ time, setTime ] = useState();
  // const chatBox = ()
  return (
    <Navigation click={'Message'}>
      <Box pos='relative' p='60px 0' h='100%' w='100%'>
        <Box bg='#8787ea'>
          <Flex align='center' justify='space-between' bg='images/4.jpg' w='100%' p='10px' h='100%'>
            <Link to='/chats'>
              <IconButton variant='ghost' icon={<FaArrowLeft/>}/>
            </Link>
            <Avatar src='images/2.jpg' boxSize='60px' mr='10px'/>
            <Box w='100%'>
              <Text color='white'>Statesman</Text>
              <Text fontSize='small'>last seen at 3:00 ...</Text>
            </Box>
            <IconButton icon={<RiGridFill/>} variant={'ghost'}/>
          </Flex>
        </Box>
        <MessageBox setTimer={setTimer} setTime={setTime} timer={timer} time={time} message={message} setMessage={setMessage}/>
      </Box>
      {timer && <Timer setTime={setTime} time={time} setTimer={setTimer}/>}
    </Navigation>
  )
}