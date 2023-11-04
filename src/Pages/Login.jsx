import react, { useContext } from 'react';
import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react';
import { RiGoogleFill } from 'react-icons/ri';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { LoginWithGoogle } from '../api';
import { Context } from '../api/Context';

export default function Login(){
    return(
        <Flex bg='#070722' w='100%' h='100vh' flexDir='column' justify='center' align='center'>
            <Text color='white' fontWeight='bold' fontSize='25px' fontFamily={'cursive'} pos='absolute' left='20px' top='10px'>MF</Text>
            <Box>
                <Text color='white' fontWeight={'semibold'} fontSize='40px'>Welcome Back!</Text>
                    <Button w='100%' h='60px' bg='white' onClick={LoginWithGoogle}>
                        <Flex align='center' gap='10px' color='#252588'>
                            <RiGoogleFill fontSize='30px'/>
                            Sign in with Google
                        </Flex>
                    </Button>
            </Box>
            <Text color='white' pos='absolute' bottom='10px'>Made with 💗 by Man Kind</Text>
        </Flex>
    )
}