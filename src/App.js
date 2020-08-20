import React, { useState,useEffect } from 'react';
import Header from './comps/Header.jsx';
import Posts from './comps/Posts.jsx';
import useDatabse from './hooks/useDatabase';
import BottomBar from './comps/BottomBar';




function App() {

  const [user,setCurrentUser]= useState(null);
  const {posts}=useDatabse('posts');
  //console.log(posts);
  
  return (
    <div className="App">
      {/* header */}
      <Header user={user} setCurrentUser={setCurrentUser}/>
      {/* Main body posts */}
      {posts && posts.map((post) =>(
                                     <Posts key={post.id} username={post.username} caption={post.caption} imgUrl={post.imgUrl}/>
                                   ))}
      {user && <BottomBar user={user}/>}
    </div>
  );
}

export default App;
