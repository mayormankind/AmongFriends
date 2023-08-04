import react from 'react';
import { Box, Flex, Text, Heading,IconButton } from '@chakra-ui/react';
import { RiMenu3Fill, RiLogoutBoxFill, RiSettings2Fill, RiShareLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Menu({menu,setMenu}){
    const Menus = [
        {id:0,menuLabel:'Logout',icon:<RiLogoutBoxFill/>,action:'/'},
        {id:1,menuLabel:'Settings',icon:<RiSettings2Fill/>,action:'/settings'},
        {id:2,menuLabel:'Invite a Friend',icon:<RiShareLine/>},
    ];
    return(
        <Flex pos='absolute' top='0' right='0' bg='white' w='200px' zIndex='200' flexDir='column' borderRadius='10px' border='2px solid lightgray' boxShadow='xs'>
            <IconButton icon={<RiMenu3Fill/>} pos='absolute' right='15px' top='10px' color={menu ? '#252588' : 'white'} zIndex='300' variant='ghost' fontSize='30px' onClick={()=>setMenu(!menu)}/>
            <Box p='5px 10px' mt='40px'>
                <Flex gap='10px' flexDir='column' w='100%' fontSize='25px' color='#252588' fontWeight='semibold'>
                    {Menus.map(menu=>(
                        <Link to={menu.action} key={menu.id}>
                            <Flex align='center' _hover={{bg:'rgba(0,0,0,0.2)'}}>{menu.icon}<Text ml='10px' p='5px' fontSize='20px'>{menu.menuLabel}</Text></Flex>
                        </Link>
                    ))}
                </Flex>
            </Box>
        </Flex>
    )
}