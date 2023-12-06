import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react'
import React, { useState} from 'react';
import Navigation from './Navigation';
import Userblock from './Userblock';
import { RiCloseFill, RiSearchLine } from 'react-icons/ri';
import CreateGroup from './CreateGroup';
import ImageViewer from './ImageViewer';
import { FaArrowLeft } from 'react-icons/fa';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../api/firebase';

export default function Search({setSearch}) {
  const [ queryS, setQuery ] = useState('');
  const [ newGroup, setNewGroup ] = useState(false);
  const [ viewImage, setViewImage ] = useState(false);
  const [ image, setImage ] = useState('');
  const [ groupName, setGroupName ] = useState('');
  const users = query(collection(db,'users'))
  const users1 = [
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
      person.username.toLowerCase().includes(queryS) || person.email.toLowerCase().includes(queryS))
  }
  return (
    <Box h='100%' w='100%' bg={'rgba(0,0,0,0.6)'} pos='fixed' top='0' left='0' zIndex='200'>
      <Box w='100%' maxW={{sm:'500px',base:'100%'}} h={{sm:'600px',base:'100%'}} m='auto' bg='white'>
        <Flex p='10px' pos='sticky' top='0' justify='center' align='center'>
          <IconButton ml='-10px' fontSize='22px' display={{sm:'none',base:'flex'}} onClick={()=>setSearch(false)} icon={<FaArrowLeft/>} variant={'ghost'}/>
          <Flex as='form' w='100%' h='50px' justify='center' align='center' border='3px solid #252588' borderRadius='20px'>
              <input type='text' placeholder='Make your search here...' style={{width:'100%',height:'100%',outline:'none',paddingLeft:'10px',borderRadius:'20px'}} onChange={(e)=>setQuery(e.target.value)} value={queryS}/>
              <IconButton type='submit' isRound icon={<RiSearchLine/>} fontSize='20px' variant={'ghost'}/>
          </Flex>
        </Flex>
        <Flex justify='center' flexDir='column' gap='5px' p='0 10px' mb='10px'>
          <Button bg='#070722' color='white' onClick={()=>setNewGroup(true)}>Create a new group chat</Button>
        </Flex>
        <Box h='80%' w='100%' overflowY={'scroll'}>
          <Flex flexDir='column' gap='5px' w='100%'>
            {/* {searchQuery(users).length == 0 ? */}
            {searchQuery(users1).length == 0 ?
            (<Box w='100%' h='100%'>
              <Text fontWeight='semibold' textAlign='center'>No results available for your search!!</Text>
            </Box>) : 
            // (searchQuery(users).map(user=>(
              // <Box key={user.uid}>
              //   <Userblock image={user.photoURL} username={user.displayName} email={user.email} id={user.uid} setImage={setImage} setViewImage={setViewImage}/>
              // </Box>
            // )))}
            (searchQuery(users1).map(user=>(
              <Box key={user.id}>
                <Userblock image={`images/${user.src}`} username={user.username} email={user.email} id={user.id} setImage={setImage} setViewImage={setViewImage} ChatUser={ChatUser}/>
              </Box>
            )))}
          </Flex>
        </Box>
        {newGroup && <CreateGroup setNewGroup={setNewGroup} groupName={groupName} setGroupName={setGroupName}/>}
        {viewImage && <ImageViewer pImage={image} setImage={setImage} setViewImage={setViewImage}/>}
      </Box>
    </Box>
  )
}