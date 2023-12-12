import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, setDoc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
import {auth,provider,db, store} from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { Button, Flex } from "@chakra-ui/react";
import { RiGoogleFill } from "react-icons/ri";

export const userRef = collection(db,'users');

export const SignOut = () => {
  signOut(auth)
  .then(() => {
    toast.success(`user is successfully logged out`);
   })
  .catch((error) => {
    alert(error);
  });
};

export const GoogleSignUp=()=>{

  const navigate = useNavigate();
  const LoginWithGoogle=async()=>{
     signInWithPopup(auth, provider)
     .then(async (res)=>{
       let user = res.user;
       await setDoc(doc(db, "users", user.uid), {
         uid:user.uid,
         displayName:user.displayName,
         email:user.email,
         photoURL:user.photoURL});
         await setDoc(doc(db, "userChats", user.uid), {});
         navigate('/');
         toast.success('Account created successfully');
     })
     .catch((err)=>{
       console.log(err)
       toast.error('account could not be created');
     })
  }
  return(
    <Button w='100%' h='60px' bg='white' onClick={LoginWithGoogle}>
    <Flex align='center' gap='10px' color='#252588'>
        <RiGoogleFill fontSize='30px'/>
            Sign up with Google
    </Flex>
    </Button>
  )
}

export const profileImageUpload = (file,setStatus) =>{
  const imagesRef = ref(store,`profileImages/${file}}`);
  const uploadTask = uploadBytesResumable(imagesRef,file)
  uploadTask.on("state_changed",
  (err) => {
    console.log(err);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(async(res)=>{
      setStatus(res);
    });
  })
}