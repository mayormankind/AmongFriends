import { Flex, Box,Text, IconButton, useColorMode, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { RiAttachmentLine, RiSendPlaneFill, RiTimerLine } from 'react-icons/ri';
// import {  } from 'react-icons/fa';

export default function MessageBox({setTimer,setTime,timer,time,message,setMessage}) {
  const {colorMode, toggleColorMode} =useColorMode();
  const isDark = colorMode == 'dark';
  const sendMessage = (e) =>{
    e.preventDefault();
    console.log(message,time)
    setMessage('')
    setTime(0)
  }
  return (
    <Flex p='10px' h='10%' w='100%' bg={isDark ? 'black' : 'white'} boxShadow={'lg'}>
      <Flex align='center' w='100%' h='100%' as='form' onSubmit={sendMessage}>
        <IconButton as='label' htmlFor='file' icon={<RiAttachmentLine/>} title='attachments' variant='ghost' color='gray' cursor='pointer' fontSize='24px'/>
        <input type='file' id='file' name='file' style={{display:'none'}}/>
        <Input type='text' placeholder='Message Here...' fontSize='18px' w='100%' border='none' outline='none' onChange={(e)=>setMessage(e.target.value)}/>
        {/* <textarea style={{resize:'none',width:'100%',padding:'0 10px', color:'black',outline:'none',border:'none',background:mode=='dark'?'black':'white'}} placeholder='Message Here...' onChange={(e)=>setMessage(e.target.value)}/> */}
        {time ? (<Text zIndex='1000' onClick={()=>setTimer(!timer)}>{time}</Text>) :
        (<IconButton zIndex='1000' icon={<RiTimerLine/>} title='timer' onClick={()=>setTimer(!timer)} color='gray' cursor='pointer' variant='ghost' fontSize='24px'/>)}
        <Button type='submit' alignItems={'center'} title='send message' cursor='pointer' color='white' bg='#252588'>
          Send
          <RiSendPlaneFill ml='5px' fontSize={'24px'}/>
        </Button>
      </Flex>
    </Flex>
  )
}