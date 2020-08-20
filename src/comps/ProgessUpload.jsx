import React,{useEffect} from 'react';
import useStorage from './../hooks/useStorage';
import {motion} from "framer-motion";

const ProgressUpload=({setOpen,setCaption,caption,user,setFile,setPostFired,file})=>{

    const {progress,url}=useStorage(file,caption,user);


    const clearStates=()=>{
        setOpen(false);
        setCaption("");
        setFile(null);
        setPostFired(false);
    }

    useEffect(()=>{
        if(url)
        {
            clearStates();
            alert("Post added Successfully");
        }
     },[url,setFile]);



    return (
        <motion.div className="upload-progress"
             initial={{width:0}}
             animate={{width:progress+'%'}}
        >

        </motion.div>
    );



}

export default ProgressUpload;