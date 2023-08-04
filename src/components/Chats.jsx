import React,{ useState } from 'react';
import { Box, Flex, Text, Heading,IconButton, Avatar } from '@chakra-ui/react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

export default function Chats(){
    // const view_Image = (image) =>{
    //     props.setViewImage(true);
    //     props.setImage(image)
    // }

    const chats = [
        {id:0, src:'1.jpg', username:'Samuel222',lastMessage:'Hey Bling! have you got any guts',time:'5:30'},
        {id:1, src:'2.jpg', username:'Tayo182',lastMessage:'Iwe FUTASU!!! ',time:'12:30'},
        {id:2, src:'3.jpg', username:'Json234', lastMessage:'The hole you drilled is quite big for the pipes to fit',time:'17:00'},
        {id:3, src:'4.jpg', username:'Mankind29', lastMessage:'You have a new anonymous message',time:'5:30'},
        {id:4, src:'5.jpg', username:'Mayokunsaw',lastMessage:'Have you tried the new AiBot?',time:'23:24'},
        {id:5, src:'6.jpg', username:'Jenny92',lastMessage:'This are the materials i got from the CRS lecturer',time:'5:30'},
        {id:6, src:'7.jpg', username:'Statesman',lastMessage:'Agent WHiskey, launch mission tequilla',time:'19:17'},
        {id:7, src:'8.jpg', username:'Kingsman',lastMessage:'Common Eggsy!',time:'1:00'},
      ]
    return(
        <Navigation click={'Message'}>
            <Box pos='relative' p='60px 0' h='100%' w='100%' overflowY='scroll'>
                <Flex flexDir='column' w='100%' h='100%'>
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
            </Box>
        </Navigation>
    )
}