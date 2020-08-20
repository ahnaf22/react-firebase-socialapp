import {useState,useEffect} from 'react';
import {projectDatabase} from '../firebase/config';


const useDatabase=(collection)=>{
  
  const [posts,setPosts] = useState([]);
  
  useEffect(() => {
    const unsub=projectDatabase.collection(collection)
                   .orderBy('createdAt','desc')
                   .onSnapshot((snap)=>{
                    let document =[];
                    //console.log(snap.docs[0].data());
                    snap.forEach(doc => {
                      document.push({...doc.data(),id:doc.id});
                    });
                    setPosts(document);
                });
    
    return ()=> unsub();
    
  }, [collection]);

  return {posts};

}

export default useDatabase;