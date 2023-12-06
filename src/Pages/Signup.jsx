import react, { useState } from 'react';
import { Box, Flex, Text, Button, IconButton, Input } from '@chakra-ui/react';
import { RiGoogleFill } from 'react-icons/ri';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { LoginWithGoogle, profileImageUpload } from '../api';
import { Context } from '../api/Context';
import { FaPhotoVideo } from 'react-icons/fa';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, provider } from '../api/firebase';

export default function Signup(){
    const [displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ image, setImage ] = useState('');
    const navigate = useNavigate()
    const selectImage = (e)=>{
        const file = e.target.files[0]
    }
    const SignUp=async()=>{
        await createUserWithEmailAndPassword(auth, email,password)
        .then(async(res)=>{
          let user = res.user;
          profileImageUpload(file,setImage)
          await updateProfile(user, {
            displayName,
            photoURL: image});
          await setDoc(doc(db, "users", user.uid), {
            uid:user.uid,
            displayName,
            email,
            photoURL: image});
          await setDoc(doc(db, "userChats", user.uid), {});
          navigate('/');
          toast.success('Account created successfully')
        })
        .catch((err)=>{
          console.log(err)
          toast.error('account could not be created');
        })
    }
    return(
        <Flex bg='#070722' w='100%' h='100vh' flexDir='column' justify='center' align='center' p='20px' color='white' textAlign='center'>
            <Text textAlign='center' fontWeight='bold' fontSize='25px' fontFamily={'cursive'} pos='absolute' left='20px' top='10px'>MF</Text>
            <Flex flexDir='column' gap='10px' w='100%' maxW={{sm:'450px',base:'100%'}}>
                <Text fontWeight={'semibold'} fontSize='40px'>Hi there!</Text>
                <Button w='100%' h='60px' bg='white' onClick={LoginWithGoogle}>
                    <Flex align='center' gap='10px' color='#252588'>
                        <RiGoogleFill fontSize='30px'/>
                            Sign up with Google
                    </Flex>
                </Button>
                <Text pos='relative' _before={{content:'""',pos:'absolute',w:'120px',h:'3px',bg:'white',top:'50%',left:'0'}} _after={{content: '""',pos:'absolute',w:'120px',h:'3px',bg:'white',top:'50%',right:'0'}}>Or</Text>
                <Flex as='form' flexDir='column' gap='10px' w={'100%'} onSubmit={SignUp}>
                    <Input w='100%' h='50px' as='input' type='text' placeholder='Username' onChange={(e)=>setDisplayName(e.target.value)}/>
                    <Input w='100%' h='50px' as='input' type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                    <Input w='100%' h='50px' as='input' type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                    <Flex as='label' htmlFor='image' align='center' gap='7px'>
                        <IconButton icon={<FaPhotoVideo/>} variant='ghost' fontSize='30px'/>
                        <Text as='span' color='lightgray'>Add your avatar</Text>
                    </Flex>
                    <Input as='input' type='file' style={{display:'none'}} id='image' onChange={selectImage}/>
                    <Button p='5px' w='100%' h='50px' bg='purple' color='white' _hover={{bg:'white',border:'2px solid purple', color:'purple'}}>Signup</Button>
                </Flex>
                <Text color='white' textAlign='center'>Have an account? <Link to='/login'><Text as='span' color='purple'>Login</Text></Link></Text>
            </Flex>
            <Text color='white' pos='absolute' bottom='10px'>Made with 💗 by Man Kind</Text>
        </Flex>
    )
}