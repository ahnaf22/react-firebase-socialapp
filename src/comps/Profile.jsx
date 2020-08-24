import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@material-ui/core/Avatar';
import NoteIcon from '@material-ui/icons/Note';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ImageGrid from './ImageGrid';


const Profile = ({ user, posts }) => {
    const [userPosts, setUserPosts] = useState(null);


    useEffect(() => {
        if (user) {
            let user_posts = posts.filter((post) => {
                if (post.userid.includes(user.uid)) {
                    return post;
                }
            });
            if (user_posts.length > 0) {
                setUserPosts(user_posts);
            }

        }
    }, [user, posts])



    return (
        <motion.div
            className="profile-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
        >
            <center>
                <img
                    className="site-header-logo"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="insta-logo" />
            </center>
            {user ?
                <div className="profile">
                    <Avatar
                        className="post-avatar"
                        alt={user.displayName}
                        src="/static/images/avatar/1.jpg"
                    />
                    <h3>{user.displayName}</h3>
                    <div className="profile-info">
                        <div className="profile-bottom"> <NoteIcon />{userPosts ? userPosts.length : 0} posts</div>
                        <div className="profile-bottom"> <TrendingUpIcon /> {userPosts ? userPosts.length : 0} following</div>
                        <div className="profile-bottom"> <SupervisedUserCircleIcon />{userPosts ? userPosts.length : 0} followers</div>
                    </div>
                    <div className="user-posts">
                        {userPosts ?


                            userPosts.map((post) => (
                                <ImageGrid key={post.id} post={post} />
                            ))


                            : "no posts yet"}
                    </div>
                </div>
                : <div> Please login to post photos and videos </div>}
        </motion.div>
    );
};

export default Profile;
