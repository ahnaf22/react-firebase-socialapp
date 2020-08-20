import {useState,useEffect} from 'react';
import { projectStorage, projectDatabase, timeStamp } from '../firebase/config';



// this js file will be used as a hook to upload file to firebase

const useStorage=(file,caption,user) => {
    //setting hoocks to store file upload proces states
    const [progress,setProgress]= useState(0);
    const [error,setError]=useState(null);
    const [url,setUrl]=useState(null);

    // using effects to put file in storage and get data accordingly
    // useEffect takes 2 parameters: (1) a function with logics (2) the file or things to process in the second param
    
    useEffect(() =>{
        //first need to create a storage reference 
        const storageRef= projectStorage.ref('postImages/'+ file.name);
        const collection = projectDatabase.collection('posts');

        storageRef.put(file).on('state_changed',(snap)=>{
             let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
             setProgress(percentage);
        },(err)=>{
            setError(err);
        },async ()=>{
            const imgUrl=await storageRef.getDownloadURL();
            setUrl(imgUrl);
            const createdAt= timeStamp();
            const username= user.displayName;
            const userid=user.uid;
            collection.add({imgUrl,createdAt,caption,userid,username});
        });

    },[file,caption]);
       
    return {progress,error,url};

}

export default useStorage;