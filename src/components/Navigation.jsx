import { Flex } from '@chakra-ui/react'
import React,{ useState} from 'react'
import Header from './Header';
import Menu from './Menu';
import NavBar from './NavBar';

export default function Navigation({children,click}) {
  const [ menu, setMenu ] = useState(false);
  return (
    <Flex h='100vh' w='100%'> 
        <Header setMenu={setMenu} menu={menu}/>
        <Flex pos='relative' w='100%' h='100%'>
          {children}
        </Flex>
        {menu && <Menu setMenu={setMenu} menu={menu}/>}
        <NavBar click={click}/>
    </Flex>
  )
}