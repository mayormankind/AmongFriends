import react, { useState } from 'react';
import { Box, Flex, Text, Button, IconButton, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export default function UserBlock(props){
    const view_Image = (image) =>{
        props.setViewImage(true);
        props.setImage(image)
    }
    const addChat = (name) =>{
        console.log(`you've added ${name} to your chat list`)
    }
    return(
        <Flex align='center' justify='space-between' p='5px 10px' boxShadow='-2px 0px 2px 2px rgba(0,0,0,0.3)'>
            <Avatar src={props.image} onClick={()=>view_Image(props.image)}/>
            <Box w='100%' ml='20px'>
                <Text fontWeight='semibold'>{props.username}</Text>
                <Text fontSize='small'>{props.email}</Text>
            </Box>
            <Button bg='#252588' color='white' onClick={()=>addChat(props.username)}>Message</Button>
        </Flex>
    )
}