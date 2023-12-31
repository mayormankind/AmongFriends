import { Flex, Box,Text, IconButton, useColorMode, Input, Button } from '@chakra-ui/react';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { RiAttachmentLine, RiSendPlaneFill, RiTimerLine } from 'react-icons/ri';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { db, store } from '../api/firebase';
import { ChatContext } from '../api/ChatContext';
import { Context } from '../api/Context';
import Timer from './Timer';

export default function MessageBox() {
  const [ message, setMessage ] = useState('');
  const [ asset, setAsset ] = useState('');
  const [ timer, setTimer ] = useState(false);
  const [ time, setTime ] = useState(0);
  const { data } = useContext(ChatContext);
  const { user } = useContext(Context);
  const {colorMode, toggleColorMode} =useColorMode();
  const isDark = colorMode == 'dark';
  const sendMessage = async() =>{
    if(asset){
      const assetRef = ref(store,uuid());
      const uploadTask = uploadBytesResumable(assetRef,asset)
      uploadTask.on(
        (err)=>{
          console.log(err);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(assetURL)=>{
            await updateDoc(doc(db,'chats',data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                message,
                senderId: user.uid,
                mfile: assetURL,
                date: Timestamp.now()
              })
            })
          })
        })
    }else{
      await updateDoc(doc(db,'chats',data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          message,
          senderId: user.uid,
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
    setAsset('')
    setTime(0)
  }
  return (
    <Flex p='10px' h='10%' w='100%' bg={isDark ? 'black' : 'white'} boxShadow={'lg'}>
      <Flex align='center' w='100%' h='100%'>
        <IconButton as='label' htmlFor='file' icon={<RiAttachmentLine/>} title='attachments' variant='ghost' color='gray' cursor='pointer' fontSize='24px'/>
        <input type='file' id='file' style={{display:'none'}} onChange={(e)=>setAsset(e.target.files[0])}/>
        <Input type='text' placeholder='Message Here...' fontSize='15px' w='100%' border='none' outline='none' onChange={(e)=>setMessage(e.target.value)} value={message}/>
        {time ? (<Text zIndex='30' onClick={()=>setTimer(!timer)}>{time}</Text>) :
        (<IconButton zIndex='30' icon={<RiTimerLine/>} title='timer' onClick={()=>setTimer(!timer)} color='gray' cursor='pointer' variant='ghost' fontSize='24px'/>)}
        <Button type='submit' isDisabled={!message ? true : false} alignItems={'center'} title='send message' cursor='pointer' color='white' bg='#252588' onClick={sendMessage}>
          Send
          <RiSendPlaneFill style={{ml:'5px',fontSize:'20px'}}/>
        </Button>
      </Flex>
      {timer && <Timer setTime={setTime} time={time} setTimer={setTimer}/>}
    </Flex>
  )
}
