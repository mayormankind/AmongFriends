import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react'
import React, { useState} from 'react';
import Navigation from './Navigation';
import Userblock from './Userblock';
import { RiSearchLine } from 'react-icons/ri';
import CreateGroup from './CreateGroup';
import ImageViewer from './ImageViewer';

export default function Search() {
  const [ query, setQuery ] = useState('');
  const [ newGroup, setNewGroup ] = useState(false);
  const [ viewImage, setViewImage ] = useState(false);
  const [ image, setImage ] = useState('');
  const [ groupName, setGroupName ] = useState('');
  const users = [
    {id:0, src:'1.jpg', username:'Samuel222', email:'samuel@gmail.com'},
    {id:1, src:'2.jpg', username:'Tayo182', email:'ty@gmail.com'},
    {id:2, src:'3.jpg', username:'Json234', email:'jason@gmail.com'},
    {id:3, src:'4.jpg', username:'Mankind29', email:'mayormankind1243@gmail.com'},
    {id:4, src:'5.jpg', username:'Mayokunsaw', email:'maysaw@gmail.com'},
    {id:5, src:'6.jpg', username:'Jenny92', email:'jen@gmail.com'},
    {id:6, src:'7.jpg', username:'Statesman', email:'agentwhiskey@gmail.com'},
    {id:7, src:'8.jpg', username:'Kingsman', email:'galahad@gmail.com'},
    {id:8, src:'2.jpg', username:'Eggsy', email:'eggsy@gmail.com'},
  ]
  const searchQuery = (data) =>{
    return data.filter(person=>
      person.username.toLowerCase().includes(query) || person.email.toLowerCase().includes(query))
  }
  return (
    <Navigation click={'Search'}>
      <Box pos='relative' p='60px 0' h='100%' w='100%' overflowY='scroll'>
        <Flex p='10px' pos='sticky' top='0' justify='center' align='center' zIndex='100'>
          <Flex as='form' w='100%' h='50px' justify='center' align='center' border='3px solid #252588' borderRadius='20px'>
              <input type='text' placeholder='Make your search here...' style={{width:'100%',height:'100%',outline:'none',paddingLeft:'10px',borderRadius:'20px'}} onChange={(e)=>setQuery(e.target.value)}/>
              <IconButton type='submit' icon={<RiSearchLine/>} fontSize='20px' variant={'ghost'}/>
          </Flex>
        </Flex>
        <Flex justify='center' flexDir='column' gap='5px' p='0 10px' mb='10px'>
          <Button bg='#070722' color='white' onClick={()=>setNewGroup(true)}>Create a new group chat</Button>
        </Flex>
        <Flex flexDir='column' gap='5px'>
          {searchQuery(users).length == 0 ?
          (<Box w='100%' h='100%'>
            <Text fontWeight='semibold' textAlign='center'>No results available for your search!!</Text>
          </Box>) : 
          (searchQuery(users).map(user=>(
            <Box key={user.id}>
              <Userblock image={`images/${user.src}`} username={user.username} email={user.email} id={user.id} setImage={setImage} setViewImage={setViewImage}/>
            </Box>
          )))}
        </Flex>
      </Box>
      {newGroup && <CreateGroup setNewGroup={setNewGroup} groupName={groupName} setGroupName={setGroupName}/>}
      {viewImage && <ImageViewer pImage={image} setImage={setImage} setViewImage={setViewImage}/>}
    </Navigation>
  )
}