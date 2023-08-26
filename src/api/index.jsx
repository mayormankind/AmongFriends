import { signInWithPopup } from "firebase/auth";
import { collection, addDoc,  onSnapshot, query, where, doc, setDoc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
import {auth,provider,db, store} from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

export const LoginWithGoogle=()=>{ 
    signInWithPopup(auth, provider)
    .then((res)=>{
      let user = res.user;
      SaveUserData({userID:user.uid,username:user.displayName,email:user.email,photoURL:user.photoURL})
      localStorage.setItem('username',user.email);
      toast('Account created successfully')
    })
    .catch((err)=>{
      console.log(err)
      toast('account could not be created');
    })
}

export const SaveUserData = (props) =>{
  addDoc(userRef, props)
  .then(()=>{})
  .catch((err)=>{
    console.log(err);
  })
}

export const SignOut = () => {
  signOut(auth)
  .then(() => {
    toast.success(`user is successfully logged out`);
    navigate('/');
   })
  .catch((error) => {
    alert(error);
  });
};

export const postImageUpload = (file,setStatus,setProgress) =>{
  const imagesRef = ref(store,`postImages/${file.name + v4()}`);
  const uploadTask = uploadBytesResumable(imagesRef,file)
  uploadTask.on("state_changed", (snapshot) =>{
  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    setProgress(progress);
  },
  (err) => {
    console.log(err);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
      setStatus(res);
    });
  })
}