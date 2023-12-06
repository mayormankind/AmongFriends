import react, { useState, useContext } from 'react';
import { Box, Flex, Text, Button, IconButton, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../api/firebase';
import { Context } from '../api/Context';


export default function UserBlock(props){
    const [ userS, setUserS ] = useState(null);
    const { user } = useContext(Context);
    const ChatUser = async(per)=>{
        const q = query(collection(db,'users'),where('displayName','===',per))
        const queryData = await getDocs(q);
        queryData.forEach(doc=>{
            setUserS(doc.data())
        })
        const mateUid = user.uid > userS.uid ? user.uid + userS.uid : userS.uid + user.uid
        try{
            const res = await getDocs(doc(db,'chats',mateUid))
            if(!res.exists()){
                await setDoc(doc,(db,'chats',mateUid),{ messages:[]})
                await updateDoc(doc(db,'userChats',user.uid),{
                    [mateUid+"Info"]:{
                        uid:user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [mateUid+".date"]: serverTimestamp(),
                })
            }
        }catch{}
        setUserS(null)
    }
    const addChat = (per) =>{
        console.log(`${per} is added already`)
    }
    const view_Image = (image) =>{
        props.setViewImage(true);
        props.setImage(image)
    }
    return(
        <Flex align='center' justify='space-between' p='5px 10px' boxShadow='-2px 0px 2px 2px rgba(0,0,0,0.3)'>
            <Avatar src={props.image} onClick={()=>view_Image(props.image)}/>
            <Box w='100%' ml='20px'>
                <Text fontWeight='semibold'>{props.username}</Text>
                <Text fontSize='small'>{props.email}</Text>
            </Box>
            {/* <Button bg='#252588' color='white' onClick={()=>ChatUser(props.username)}>Message</Button> */}
            <Button bg='#252588' color='white' onClick={()=>addChat(props.username)}>Message</Button>
        </Flex>
    )
}