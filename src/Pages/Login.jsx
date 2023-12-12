import react, { useContext, useState } from 'react';
import { Flex, Input, Text, Button } from '@chakra-ui/react';
import { RiGoogleFill } from 'react-icons/ri';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { GoogleSignUp } from '../api';
import { Context } from '../api/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';
import { toast } from 'react-toastify';

export default function Login(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate()
    const SignIn=async()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((res)=>{
            console.log(res)
            navigate('/')
            toast.success('Account login successfully')
        })
        .catch((err)=>{
          console.log(err)
          toast.error('could not log you in');
        })
    }

    return(
        <Flex bg='#070722' w='100%' h='100vh' flexDir='column' justify='center' align='center' p='20px' color='white' textAlign='center'>
            <Text fontWeight='bold' fontSize='25px' fontFamily={'cursive'} pos='absolute' left='20px' top='10px'>MF</Text>
            <Flex flexDir='column' gap='10px' w='100%' maxW={{sm:'450px',base:'100%'}}>
                <Text fontWeight={'semibold'} fontSize='40px'>Welcome Back!</Text>
                <GoogleSignUp/>
                <Text pos='relative' _before={{content:'""',pos:'absolute',w:'120px',h:'3px',bg:'white',top:'50%',left:'0'}} _after={{content: '""',pos:'absolute',w:'120px',h:'3px',bg:'white',top:'50%',right:'0'}}>Or</Text>
                <Flex flexDir='column' gap='10px' >
                    <Input w='100%' h='50px' as='input' type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                    <Input w='100%' h='50px' as='input' type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                    <Button p='5px' w='100%' h='50px' bg='purple' color='white' _hover={{bg:'white',border:'2px solid purple', color:'purple'}} onClick={SignIn}>Login</Button>
                </Flex>
                <Text textAlign='center' color='white'>Don't have an account? <Link to='/signup'><Text as='span' color='purple'>Signup</Text></Link></Text>
            </Flex>
            <Text color='white' pos='absolute' bottom='10px'>Made with 💗 by Man Kind</Text>
        </Flex>
    )
}