import React, { useContext, useState, useEffect } from 'react';
import { Box, Flex, useColorMode } from '@chakra-ui/react';
import Message from './Message';
import { ChatContext } from '../api/ChatContext';
import { db } from '../api/firebase';

export default function Messages() {
  const [ messages, setMessages ] = useState([]);
  const { data } = useContext(ChatContext);
  const { colorMode } = useColorMode();
  const isDark = colorMode == 'dark';

  useEffect(() => {
    const unSub = onSnapshot(doc(db,'chats',data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })
    return () => {
      unSub()
    }
  }, [data.chatId])
  
  return (
    <Flex gap='10px' flexDir='column' p='10px' w='100%' h='80%' overflowY='scroll' bg='#515185'>
      {/* {messages.map(message=>(
        <Message message={message} owner={`${message.senderId === user.uid ? 'receiver' : 'sender'}`}/>   
      ))} */}
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
