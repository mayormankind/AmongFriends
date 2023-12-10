import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
// import Navigation from './Navigation';
import Userblock from './Userblock';
import { RiCloseFill, RiSearchLine } from 'react-icons/ri';
import CreateGroup from './CreateGroup';
import ImageViewer from './ImageViewer';
import { FaArrowLeft } from 'react-icons/fa';
import { collection, getDocs, query, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../api/firebase';

export default function Search({setSearch}) {
  const [ queryS, setQuery ] = useState('');
  const [ users, setUsers ] = useState([]);
  const [ newGroup, setNewGroup ] = useState(false);
  const [ viewImage, setViewImage ] = useState(false);
  const [ image, setImage ] = useState('');
  const [ groupName, setGroupName ] = useState('');
  const userRef = collection(db,'users');

  useEffect(()=>{
    onSnapshot(userRef,(snapshot)=>{
      setUsers(
        snapshot.docs.map((docs) =>{
          return { ...docs.data() };
        })
      );
    })
  },[])
  console.log(users)

  const searchQuery = (data) =>{
    return data.filter(person=>
      person.displayName.toLowerCase().includes(queryS) || person.email.toLowerCase().includes(queryS))
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
            {users && searchQuery(users).length == 0 ?
            (<Box w='100%' h='100%'>
              <Text fontWeight='semibold' textAlign='center'>No results available for your search!!</Text>
            </Box>) : 
            (users && searchQuery(users).map(user=>(
              <Box key={user.uid}>
                <Userblock image={user.photoURL} displayName={user.displayName} email={user.email} id={user.uid} setImage={setImage} setViewImage={setViewImage}/>
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