import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {motion} from "framer-motion";


function Posts({username,caption,imgUrl}) {
    return (
        <motion.div className="post"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:1}}
        >
            <div className="post-header">
                <Avatar
                     className="post-avatar" 
                     alt={username} 
                     src="/static/images/avatar/1.jpg" 
                     />
                <h3>{username}</h3>
            </div>
            
             <img 
                 className="post-image"
                 src={imgUrl}
                 alt=""/>
            <h4 className="post-text"><strong>{username}:</strong> {caption}</h4>
        </motion.div>
    )
}

export default Posts
