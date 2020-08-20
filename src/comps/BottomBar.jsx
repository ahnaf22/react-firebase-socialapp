import React, { useState } from 'react';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import SearchIcon from '@material-ui/icons/Search';
import UploadModal from './UploadModal';

const BottomBar = ({user})=>{

    const [file,setFile]=useState(null);
    // modal variables
    const [open, setOpen] = useState(false);
    const [fileUrl,setFileUrl]= useState(null);
    // allowedfile types
    const filetypes = ['image/png','image/jpeg'];


    const changeFile=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile && filetypes.includes(selectedFile.type))
        {
             // if there is any file selected then set local state
            setFile(selectedFile);
            //console.log(e.target.files[0]);
            //let reader = new FileReader();
            let url= URL.createObjectURL(selectedFile);
            console.log(url);
            setFileUrl(url);
            // reader.onload = function(ev){
            //     //console.log(ev.target.result);
            //     setFileUrl(ev.target.result);
            // };
            // reader.readAsDataURL(selectedFile);
            setOpen(true);
        }else{
            setFile(null);
            alert("Please Enter a valid file(png or jpeg)");
    
        }
        e.target.value="";
    }

    return(
       
        <div className="bottomWrap">
            <div className="bottomContent">
                 <FavoriteSharpIcon className="noti-icon"/>
                 <form>
                    <label>
                        <input type="file" onChange={changeFile} />
                        <span>+</span>
                    </label>
                 </form>
                 <SearchIcon className="search-icon"/>
            </div>
            {file && <UploadModal 
                                  open={open} 
                                  setOpen={setOpen} 
                                  file={file} 
                                  setFile={setFile} 
                                  user={user}
                                  fileUrl={fileUrl}
                                  /> }
        </div>

    );


}


export default BottomBar;