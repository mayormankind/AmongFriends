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
    const chats1 = [
        {id:0, src:'1.jpg', username:'Samuel222',lastMessage:'Hey Bling! have you got any guts',time:'5:30'},
        {id:1, src:'2.jpg', username:'Tayo182',lastMessage:'Iwe FUTASU!!! ',time:'12:30'},
        {id:2, src:'3.jpg', username:'Json234', lastMessage:'The hole you drilled is quite big for the pipes to fit',time:'17:00'},
        {id:3, src:'4.jpg', username:'Mankind29', lastMessage:'You have a new anonymous message',time:'5:30'},
        {id:4, src:'5.jpg', username:'Mayokunsaw',lastMessage:'Have you tried the new AiBot?',time:'23:24'},
        {id:5, src:'6.jpg', username:'Jenny92',lastMessage:'This are the materials i got from the CRS lecturer',time:'5:30'},
        {id:6, src:'7.jpg', username:'Statesman',lastMessage:'Agent WHiskey, launch mission tequilla',time:'19:17'},
        {id:7, src:'8.jpg', username:'Kingsman',lastMessage:'Common Eggsy!',time:'1:00'},
        {id:8, src:'8.jpg', username:'Kingsman',lastMessage:'Common Eggsy!',time:'1:00'},
        {id:9, src:'8.jpg', username:'Kingsman',lastMessage:'Common Eggsy!',time:'1:00'},
        {id:10, src:'8.jpg', username:'Kingsman',lastMessage:'Common Eggsy!',time:'1:00'},
    ]

  return (
    <Flex flexDir='column' h='80%' overflowY='scroll' w='100%'>
        {/* {Object.entries(chats)?.sort((a,b) =>b[1].date - a[1].date).map((chat)=>(
            <Flex align='center' gap='10px' key={chat[0]}justify='space-between' p='10px'>
                <Avatar src={chat[1].Info.photoURL} boxSize='50px' mr='15px' cursor='pointer' onClick={()=>view_Image(chat[1].Info.photoURL)}/>
                <Box w='100%' onClick={()=>chatUser(chat[1].Info)}>
                    <Text fontWeight='semibold'>{chat[1].Info.displayName}</Text>
                    <Text fontSize='small' color='bg.100'>{chat[1].lastMessage?.text}</Text>
                </Box>
                <Text fontSize='small'>{chat[2]}</Text>
            </Flex>
        ))} */}
        {chats1.map((chat)=>(
            <Flex align='center' gap='10px' key={chat.id}justify='space-between' p='10px'>
                <Avatar src={`images/${chat.src}`} boxSize='50px' mr='15px' cursor='pointer' onClick={()=>view_Image(`images/${chat.src}`)}/>
                <Box w='100%'>
                    <Link to='/message' w='100%'>
                        <Text fontWeight='semibold'>{chat.username}</Text>
                        <Text fontSize='small' color='bg.100'>{chat.lastMessage}</Text>
                    </Link>
                </Box>
                <Text fontSize='small'>{chat.time}</Text>
            </Flex>
        ))}
        {viewImage && <ImageViewer pImage={image} setImage={setImage} setViewImage={setViewImage}/>}
    </Flex>
  )
}
