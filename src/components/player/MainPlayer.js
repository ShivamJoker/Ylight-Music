import React, {useEffect, useContext} from 'react'
import { GlobalContext } from "../GlobalState";


const MainPlayer = ()=>{
const { currentVideoId, setCurrentVideoId } = useContext(GlobalContext);

    useEffect(()=>{
        console.log("id changed = " + currentVideoId)
    }, [currentVideoId])
    
    return(
        <div>
            main player
        </div>
    )
}

export default MainPlayer;