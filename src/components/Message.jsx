import React, { useContext, useRef, useEffect, useState } from 'react';
import { useColorMode, Text, Image, Flex, Avatar } from '@chakra-ui/react';
import { ChatContext } from '../api/ChatContext';
import { Context } from '../api/Context';
import ImageViewer from './ImageViewer';

export default function Message({ message,owner }) {
  const [ view, setViewImage ] = useState(false);
  const [ image, setImage ] = useState(false);
  const { data } = useContext(ChatContext);
  const { user } = useContext(Context);
  const { colorMode } = useColorMode();
  const isDark = colorMode == 'dark';
  const refr = useRef();

  useEffect(()=>{
    refr.current?.scrollIntoView({behaviour:'smooth'})
  },[message])

  const view_Image = (image) =>{
    setViewImage(true);
    setImage(image)
  }

  return (
    <Flex flexDir={owner==='sender'&&'row-reverse'} ref={refr} gap='10px'>
      <Flex flexDir='column' >
        <Avatar src={message.senderId === user.uid ? user.photoURL : data.user.photoURL} alt={data.displayName} boxSize='40px'/>
      </Flex>
      <Flex flexDir='column' gap='5px' w='100%' maxW='80%' alignItems={owner=='sender' ? 'flex-end' : 'flex-start'} >
        <Text as='span' mb='-10px'>{message.time}</Text>
        <Text as='p' borderRadius={owner=='sender' ? '10px 0 10px 10px' : '0 10px 10px 10px'} w='fit-content' bg={owner === 'receiver' ? isDark? 'black' : 'lightgray' : isDark ? 'purple' : 'purple.400'} p='10px'>{message.message}</Text>
        {message.mfile &&
        <Image src={message.mfile} onClick={()=>view_Image(message.mfile)} alt={'image'} w='50%'/>
        }
      </Flex>
      {view && <ImageViewer pImage={image} setViewImage={setViewImage} setImage={setImage}/>}
    </Flex>
  )
}
