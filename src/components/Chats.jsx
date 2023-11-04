import React from 'react';
import { Flex, Text, Box, Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Chats() {
    const chats = [
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
        {chats.map((chat)=>(
            <Flex align='center' gap='10px' key={chat.id}justify='space-between' p='10px'>
                <Avatar src={`images/${chat.src}`} boxSize='50px' mr='15px'/>
                <Box w='100%'>
                    <Link to='/message' w='100%'>
                        <Text fontWeight='semibold'>{chat.username}</Text>
                        <Text fontSize='small' color='bg.100'>{chat.lastMessage}</Text>
                    </Link>
                </Box>
                <Text fontSize='small'>{chat.time}</Text>
            </Flex>
        ))}
    </Flex>
  )
}
