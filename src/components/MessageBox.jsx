import { Flex, Box,Text, IconButton, useColorMode, Input, Button } from '@chakra-ui/react';
import { Timestamp, serverTimestamp, updateDoc } from 'firebase/firestore';
import React from 'react';
import { RiAttachmentLine, RiSendPlaneFill, RiTimerLine } from 'react-icons/ri';
import { db, store } from '../api/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import {  } from 'react-icons/fa';

export default function MessageBox({setTimer,setFile,setTime,timer,time,message,setMessage,file}) {
  const { data } = useContext(ChatContext);
  const { user } = useContext(Context);
  const {colorMode, toggleColorMode} =useColorMode();
  const isDark = colorMode == 'dark';
  const sendMessage = async(e) =>{
    e.preventDefault();
    console.log(message,time)
    setMessage('')
    setFile()
    setTime(0)
    if(file){
      const fileRef = ref(store,uuid());
      const uploadTask = uploadBytesResumable(fileRef,file);
      uploadTask.on(
        (err)=>{
          console.log(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(res)=>{
            await updateDoc(doc(db,'chats',data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                message,
                senderId: user.uid,
                file: res,
                deleteTime: timer,
                date: Timestamp.now()
              })
            })
          })
        }
      )
    }else{
      await updateDoc(doc(db,'chats',data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          message,
          senderId: user.uid,
          deleteTime: timer,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db,'userChats',user.uid),{
      [data.chatId + '.lastMessage']: {message},
      [data.chatId + '.date']: serverTimestamp(),
    })
    
    await updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId + '.lastMessage']: {message},
      [data.chatId + '.date']: serverTimestamp(),
    })
    setMessage('')
    setFile(null)
  }
  return (
    <Flex p='10px' h='10%' w='100%' bg={isDark ? 'black' : 'white'} boxShadow={'lg'}>
      <Flex align='center' w='100%' h='100%' as='form' onSubmit={sendMessage}>
        <IconButton as='label' htmlFor='file' icon={<RiAttachmentLine/>} title='attachments' variant='ghost' color='gray' cursor='pointer' fontSize='24px'/>
        <input type='file' id='file' name='file' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])} value={file}/>
        <Input type='text' placeholder='Message Here...' fontSize='18px' w='100%' border='none' outline='none' onChange={(e)=>setMessage(e.target.value)} value={message}/>
        {time ? (<Text zIndex='30' onClick={()=>setTimer(!timer)}>{time}</Text>) :
        (<IconButton zIndex='30' icon={<RiTimerLine/>} title='timer' onClick={()=>setTimer(!timer)} color='gray' cursor='pointer' variant='ghost' fontSize='24px'/>)}
        <Button type='submit' alignItems={'center'} title='send message' cursor='pointer' color='white' bg='#252588'>
          Send
          <RiSendPlaneFill ml='5px' fontSize={'24px'}/>
        </Button>
      </Flex>
    </Flex>
  )
}