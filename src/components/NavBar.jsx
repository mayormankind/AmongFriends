import { Link } from 'react-router-dom';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { RiMessengerLine, RiMessengerFill, RiAddFill, RiAddLine, RiSearchLine, RiSearchFill } from 'react-icons/ri';

export default function NavBar({click}){
    const Navs = [
        {id:0,navLabel:'Login',path:'/',iconFill: <RiAddFill/>, iconLine: <RiAddLine/>},
        {id:1,navLabel:'Message',path:'/chats',iconFill: <RiMessengerFill/>, iconLine: <RiMessengerLine/>},
        {id:2,navLabel:'Search',path:'/search',iconFill: <RiSearchFill/>, iconLine: <RiSearchLine/>}
    ]
    return(
        <Box bg='#070722' w='100%' h='60px' pos='fixed' bottom='0' p='10px' zIndex='100'>
            <Flex justify='space-around' align='center'>
                {Navs.map(nav=>(
                    <Link to={nav.path} key={nav.id}> 
                        <IconButton color='white' transform={nav.navLabel===click ? 'scale(2)' : 'none'} icon={nav.navLabel === click ? nav.iconFill : nav.iconLine} variant={'ghost'} fontSize={'30px'} />
                    </Link>
                ))}
            </Flex>
        </Box>
    )
}