import React,{ useContext, useEffect, useState } from 'react';
import { Flex, Text, Box, Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ImageViewer from './ImageViewer';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../api/firebase';
import { Context } from '../api/Context';
import { ChatContext } from '../api/ChatContext';

export default function Chats() {
    const [ viewImage, setViewImage ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ chats, setChats ] = useState([]);
    const { user } = useContext(Context)
    const { dispatch } = useContext(ChatContext)
    const view_Image = (image) =>{
        setViewImage(true);
        setImage(image)
    }

    useEffect(()=>{
        const FetchChats = () =>{
            const unsub = onSnapshot(doc(db,'userChats',user.uid),(doc)=>{
                setChats(doc.data())
            });
            return ()=>{
                unsub()
            }
        }
        {user.uid && FetchChats()}
    },[user.uid])

    const chatUser = (theUser) =>{
        dispatch({type: 'SWITCH_USER', payload: theUser})
    }

  return (
    <Flex flexDir='column' h='80%' overflowY='scroll' w='100%'>
        {Object.entries(chats)?.sort((a,b) =>b[1].date - a[1].date).map((chat)=>(
            <Flex align='center' gap='10px' key={chat[0]}justify='space-between' p='10px'>
                <Avatar src={chat[1].Info.photoURL} boxSize='50px' mr='15px' cursor='pointer' onClick={()=>view_Image(chat[1].Info.photoURL)}/>
                <Box w='100%' onClick={()=>chatUser(chat[1].Info)}>
                    <Text fontWeight='semibold'>{chat[1].Info.displayName}</Text>
                    <Text fontSize='small' color='bg.100'>{chat[1].lastMessage?.message}</Text>
                </Box>
                <Text fontSize='small'>{chat[2]}</Text>
            </Flex>
        ))}
        {viewImage && <ImageViewer pImage={image} setImage={setImage} setViewImage={setViewImage}/>}
    </Flex>
  )
}
