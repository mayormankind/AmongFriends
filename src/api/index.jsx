import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc,  onSnapshot, query, where, doc, setDoc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
import {auth,provider,db, store} from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { v4 as uuid } from 'uuid';

export const userRef = collection(db,'users');

export const LoginWithGoogle=async()=>{
  // const navigate = useNavigate();

    signInWithPopup(auth, provider)
    .then(async (res)=>{
      let user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        uid:user.uid,
        displayName:user.displayName,
        email:user.email,
        photoURL:user.photoURL});
        await setDoc(doc(db, "userChats", user.uid), {});
        // navigate('/');
      toast.success('Account created successfully')
    })
    .catch((err)=>{
      console.log(err)
      toast.error('account could not be created');
    })
}

export const SignOut = () => {
  signOut(auth)
  .then(() => {
    toast.success(`user is successfully logged out`);
   })
  .catch((error) => {
    alert(error);
  });
};

// export const postImageUpload = (file,setStatus,setProgress) =>{
//   const imagesRef = ref(store,`postImages/${file.name + v4()}`);
//   const uploadTask = uploadBytesResumable(imagesRef,file)
//   uploadTask.on("state_changed", (snapshot) =>{
//   const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//     setProgress(progress);
//   },
//   (err) => {
//     console.log(err);
//   },
//   ()=>{
//     getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
//       setStatus(res);
//     });
//   })
// }

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