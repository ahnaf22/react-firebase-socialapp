import React,{useEffect,useState} from 'react'
var time=0;
function Progressbar({fired,setEventFired}) {
    const [progress,setProgress]= useState(0);    

    function setimer(){
        time++;
        let percentage = (time/230)*100;
        if(percentage<=100){
            setProgress(percentage);
        }
        
    }

    useEffect(()=>{
        if(fired){
            let timerId = setInterval(setimer,1);
            setTimeout(() => { clearInterval(timerId);time=0;setEventFired(false)},1000);    
        }
        
        
    },[]);

    return (
        <div 
             className="progress-bar"
             style={{width:progress +'%'}}
        >
        </div>
    )
}


  



  







export default Progressbar;