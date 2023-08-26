import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { RiMenu3Fill } from 'react-icons/ri';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export default function Header({menu,setMenu}){
    return(
        <Box p='10px' bg='#070722' w='100%' h='60px' pos='fixed' top='0' zIndex='100'>
            <Flex justify='space-between' align='center'>
                <Text fontWeight='bold' flex='0.65' fontSize='22px' color='white'>MongFrens</Text>
                <Flex align='center' justify='space-between' flex='0.35'>
                    <ColorModeSwitcher/>
                    <Avatar src='images/4.jpg' boxSize='35px'/>
                    <IconButton icon={<RiMenu3Fill/>} color={menu ? '#252588' : 'white'} zIndex='400' variant='ghost' fontSize='30px' onClick={()=>setMenu(!menu)}/>
                </Flex>
            </Flex>
        </Box>
    )
}