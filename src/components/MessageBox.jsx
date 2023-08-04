import { Flex, Box,Text, IconButton } from '@chakra-ui/react';
import React from 'react';
import { RiAttachmentLine, RiSendPlaneFill, RiTimerLine } from 'react-icons/ri';
// import {  } from 'react-icons/fa';

export default function MessageBox({setTimer,setTime,timer,time,message,setMessage}) {

  const sendMessage = () =>{
    console.log(message,time)
    setMessage('')
    setTime(0)

  }
  return (
    <Flex pos='absolute' bottom='0' h='60px' w='100%' borderRadius='5px' border='2px solid gray' bg='white' mb='60px'>
      <Flex align='center' w='100%' h='100%' color='#070722'>
        <IconButton as='label' htmlFor='file' icon={<RiAttachmentLine/>} variant='ghost' fontSize='20px'/>
        <input type='file' id='file' name='file' style={{display:'none'}} color='black'/>
        <textarea style={{resize:'none',width:'100%',padding:'0 10px',outline:'none',border:'none'}} placeholder='Message Here...' onChange={(e)=>setMessage(e.target.value)}/>
        {time ? (<Text zIndex='1000' onClick={()=>setTimer(!timer)}>{time}</Text>) :
        (<IconButton zIndex='1000' icon={<RiTimerLine/>} onClick={()=>setTimer(!timer)} variant='ghost' fontSize='30px'/>)}
        <IconButton icon={<RiSendPlaneFill/>} cursor='pointer' variant='ghost' fontSize='30px' onClick={sendMessage}/>
      </Flex>
    </Flex>
  )
}