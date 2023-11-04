import React,{ useContext, useState } from 'react';
import { Box, Flex, Text, Heading,IconButton, Avatar, Grid, Button } from '@chakra-ui/react';
import Navigation from './Navigation';
import Chats from './Chats';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Link } from 'react-router-dom';
import { RiSearchLine, RiMenu3Fill } from 'react-icons/ri';
import Search from './Search';
import { Context } from '../api/Context';
import { SignOut } from '../api';

export default function Sidebar({menu,setMenu}){
    const [ search,setSearch ] = useState(false);
    const { user } = useContext(Context)
    // const view_Image = (image) =>{
    //     props.setViewImage(true);
    //     props.setImage(image)
    // }
    const Navs = [
        {id:0,navLabel:'Search',path:'/search', icon: <RiSearchLine/>}
    ]
    
    return(
        // <Navigation click={'Message'}>
            <Flex h='100%' w='100%' flex={'1'} maxH='100vh'>
                <Box w='100%' h='100%'>
                    <Flex align='center' justify='space-between' w='100%' p='10px' h='10%' bg='#070722'>
                        <Text fontWeight='bold' flex='0.65' fontSize='22px' color='white'>MongFrens</Text>
                        <IconButton color='white' icon={<RiSearchLine/>} variant={'ghost'} fontSize={'24px'} onClick={()=>setSearch(true)}/>
                        <Flex align='center' justify='space-between' flex='0.35'>
                            <ColorModeSwitcher/>
                            <IconButton icon={<RiMenu3Fill/>} color={menu ? '#252588' : 'white'} zIndex='400' variant='ghost' fontSize='24px' onClick={()=>setMenu(!menu)}/>
                        </Flex>
                    </Flex>
                    <Chats/>
                    <Flex align='center' h='10%' p='10px' bg='#070722'>
                        <Flex flex='1' align='center'>
                            <Avatar src={user.photoURL} boxSize='40px' mr='10px'/>
                            <Text textTransform={'capitalize'} color='white'>{user.displayName}</Text>
                        </Flex>
                        {/* <Link to='/login'> */}
                            <Button color='white' bg='#252588' onClick={SignOut}>Logout</Button>
                        {/* </Link> */}
                    </Flex>
                </Box>
                {search && <Search setSearch={setSearch}/>}
            </Flex>
        // </Navigation>
    )
}