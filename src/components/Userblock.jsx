import react, { useState } from 'react';
import { Box, Flex, Text, Button, IconButton, Avatar } from '@chakra-ui/react'

export default function UserBlock(props){
    let button = 'Add user';
    const [buttonChange, setButtonChange ] = useState('Add user');
    const view_Image = (image) =>{
        props.setViewImage(true);
        props.setImage(image)
    }
    const addChat = (name) =>{
        setButtonChange('Message')
        console.log(`you've added ${name} to your chat list`)
    }
    return(
        <Flex align='center' justify='space-between' p='5px 10px' boxShadow='-2px 0px 2px 2px rgba(0,0,0,0.3)'>
            <Avatar src={props.image} onClick={()=>view_Image(props.image)}/>
            <Box w='100%' ml='20px'>
                <Text fontWeight='semibold'>{props.username}</Text>
                <Text fontSize='small'>{props.email}</Text>
            </Box>
            <Button bg='#252588' color='white' onClick={()=>addChat(props.username)}>{buttonChange}</Button>
        </Flex>
    )
}