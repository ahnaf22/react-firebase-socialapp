import React,{ useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ProgressUpload from './ProgessUpload';

const UploadModal = ({open,setOpen,file,setFile,user,fileUrl}) =>{

    // modal variables
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    
    
    // statevariables
    const [caption,setCaption]=useState("");
    const [postfired,setPostFired]=useState(false);
    
    
    
    //console.log(user.uid);
    //console.log(file);

    const post=(e)=>{
        e.preventDefault();
        //console.log(caption);
        if(caption.length < 1)
        {
          alert("please enter a caption");
        }else{
          setPostFired(true);
        }
        
    }

    return (
            <div className="upload-modal">
                <Modal
                        open={open}
                        onClose={()=>{
                          setOpen(false);
                          setFile(null);
                        }}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <form className="form-signup">
                                        <div className="post-header">
                                            <Avatar
                                                className="post-avatar" 
                                                alt={user.displayName} 
                                                src="/static/images/avatar/1.jpg" 
                                                />
                                            <h3>{user.displayName}</h3>
                                        </div>
                                        <Input
                                            placeholder= 'Caption your post'
                                            type="text"
                                            value={caption}
                                            onChange={(e)=> setCaption(e.target.value)}
                                        />
                                        <img 
                                        className="post-image-preview"
                                        src={fileUrl}
                                        alt="Image Preview"/>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='secondary'
                                            style={{width:'100px',margin:'20px auto'}}
                                            onClick={post}
                                            >Post
                                        </Button>
                            </form>
                          {postfired && <ProgressUpload
                                              setOpen={setOpen}
                                              setCaption={setCaption}
                                              caption={caption}
                                              user={user}
                                              setFile={setFile}
                                              setPostFired={setPostFired}
                                              file={file}
                                         />}
                        </div>
                   </Modal>
    
            </div>
        );

}






// modal stylings
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 350,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      fontFamily: 'Cairo',
      outline:'none', 
    },
  }));


export default UploadModal;