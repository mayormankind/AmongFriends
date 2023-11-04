import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc,  onSnapshot, query, where, doc, setDoc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
import {auth,provider,db, store} from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

export const userRef = collection(db,'users');

export const LoginWithGoogle=async()=>{
    signInWithPopup(auth, provider)
    .then(async (res)=>{
      let user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        userID:user.uid,
        username:user.displayName,
        email:user.email,
        photoURL:user.photoURL});
      localStorage.setItem('username',user.email);
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