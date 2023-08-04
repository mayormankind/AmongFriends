import react from 'react';
import { Box, Flex, Text, Button, IconButton, Heading, Input } from '@chakra-ui/react'
import React, { useState} from 'react';
import { RiCloseFill } from 'react-icons/ri';


export default function CreateGroup({setNewGroup,setGroupName,groupName}){
    const createGroup = () =>{
        console.log(groupName)
        setNewGroup(false)
    }
    return(
        <Flex pos='fixed' w='100%' h='100vh' justify='center' align='center' bg='rgba(0,0,0,0.9)' zIndex='700' p='20px'>
            <Flex w='100%' flexDir='column' gap='20px' p='20px'>
                <Flex justify='space-between' align='center' color='white' borderBottom='1px solid white'>
                    <Heading fontWeight='bold'>Group Name</Heading>
                    <IconButton icon={<RiCloseFill/>} onClick={()=>setNewGroup(false)} variant='ghost' fontSize='30px'/>
                </Flex>
                <Input type='text' h='60px' color='white' placeholder='Group chat name ....' _placeholder={{color:'white'}} onChange={(e)=>setGroupName(e.target.value)}/>
                <Button color='white' bg='#252588' onClick={createGroup}>Create Group</Button>
            </Flex>
        </Flex>
    )
}