import React from 'react'

import youtubeSearch from '../apis/youtubeSearch'

const RelatedVideos = ()=>{
    const searchYt = async data => {
        const res = await youtubeSearch.get("/playlistitems", {
          params: {
            q: data,
          }
        });
        console.log(res.data.items);
        
      };



}


export default RelatedVideos