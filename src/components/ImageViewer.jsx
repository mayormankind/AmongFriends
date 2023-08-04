import { Flex, IconButton, Image, Box, Text } from '@chakra-ui/react';
import react from 'react';
import { RiCloseFill } from 'react-icons/ri';

export default function ImageViewer({pImage,setViewImage,setImage}){
    const exitImage= () =>{
        setImage('')
        setViewImage(false)
    }
    return(
        <Flex pos='fixed' justify='center' align='center' w='100%' h='100vh' bg='rgba(0,0,0,0.9)' overflow={'hidden'} zIndex='1000'>
            <Box>
                <IconButton icon={<RiCloseFill/>} fontSize='30px' variant='ghost' pos='absolute' right='0' onClick={exitImage}/>
                <Image alt={'image of a beauty'} src={pImage} h='100%' w='100%' maxH='600px' bgPos={'center'} bgSize='contain'/>
                <Text textAlign='center' color='white'>{'Image of beauty'}</Text>
            </Box>
        </Flex>
    )
}