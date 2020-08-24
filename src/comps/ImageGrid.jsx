import React from 'react';

const ImageGrid = ({ post }) => {

    return (
        <div className="user-post-Image">
            <img src={post.imgUrl} alt={post.caption} />
        </div>
    );

}


export default ImageGrid;