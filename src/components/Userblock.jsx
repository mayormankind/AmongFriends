import react, { useState, useContext } from 'react';
import { Box, Flex, Text, Button, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../api/firebase';
import { Context } from '../api/Context';


export default function UserBlock(props){
    const { user } = useContext(Context);
    const findUser = async(per)=>{
        const q = query(collection(db,'users'),where('displayName','==',per));
        try{
            const queryData = await getDocs(q);
            queryData.forEach((doc)=>{
                props.setUserS(doc.data())
            });
            addUser();
        }catch{}
    }


    const chatUser = (per) =>{
        findUser(per);
        // props.setSearch(false);
    }

    const addUser = async () =>{
        const mateUid = user.uid > props.userS.uid ? user.uid + props.userS.uid : props.userS.uid + user.uid;
        try{
            const res = await getDoc(doc(db,'chats',mateUid));
            if(!res.exists()){
                await setDoc(doc(db,'chats',mateUid),{ messages:[]});

                await updateDoc(doc(db,'userChats',user.uid),{
                    [mateUid+".Info"]:{
                        uid:props.userS.uid,
                        displayName: props.userS.displayName,
                        photoURL: props.userS.photoURL
                    },
                    [mateUid+".date"]: serverTimestamp(),
                })
                await updateDoc(doc(db,'userChats',props.userS.uid),{
                    [mateUid+".Info"]:{
                        uid:user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [mateUid+".date"]: serverTimestamp(),
                })
            }
        }catch (err) {
            console.log(err)
        }
        props.setUserS(null);
    }
   
    const view_Image = (image) =>{
        props.setViewImage(true);
        props.setImage(image)
    }

    return(
        <Flex align='center' justify='space-between' p='5px 10px' boxShadow='-2px 0px 2px 2px rgba(0,0,0,0.3)'>
            <Avatar src={props.image} onClick={()=>view_Image(props.image)}/>
            <Box w='100%' ml='20px' color='black'>
                <Text fontWeight='semibold'>{props.displayName}</Text>
                <Text fontSize='small'>{props.email}</Text>
            </Box>
            <Button bg='#252588' color='white' onClick={()=>chatUser(props.displayName)}>Message</Button>
        </Flex>
    )
}