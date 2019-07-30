import Dexie from "dexie";

// Define your database
const db = new Dexie("Song_Database");

// create new databse
// our schema is of storing a song
db.version(1).stores({
  songs:
    "&videoId, timestamp, playbackTimes, [rating+timestamp]"
});



// add or update song on play
export const updatePlayingSong = async data => {
  const videoObj = {
    videoId: data.id,
    timestamp: Date.now(),
    title: data.title,
    channelTitle: data.channelTitle,
    playbackTimes: 1,
    rating: "none"
  };

  const song = await db.songs.get({ videoId: data.id });
  // if song exists we will just update the timestamp and the playback
  if (song) {
    db.songs.update(data.id, {
      timestamp: Date.now(),
      playbackTimes: song.playbackTimes + 1
    });
    console.log("song updated");
    return song.rating;
    // return the rating
  } else {
    // we will add a new song
    console.log("song added");
    db.songs.add(videoObj);
  }
};

// like or dislike a song on database
export const rateSong = async (id, rating) => {
  // if user likes the song then only download it

  db.songs.update(id, {
    rating: rating
  });
};

export const getHistory = async () => {
  const songsByTimeStamp = await db.songs
    .orderBy("timestamp")
    .limit(15)
    .reverse()
    .toArray();
  return songsByTimeStamp;
};

export const getLikedSongs = async () => {
  const likedSongs = await db.songs
    .where("[rating+timestamp]") //this will filter song based on time and liked
    .between(["liked", Dexie.minKey], ["liked", Dexie.maxKey])
    .reverse()
    .toArray();
  return likedSongs;
};

export const downloadSong = async (id, url) => {
  console.log("song started to download");
  try {
    const song = await getSongBlob(url);
    db.songs.update(id, {
      audio: song
    });
    return "downloaded";
  } catch (error) {
    return error;
  }
};

export const deleteSongAudio = async id => {
  await db.songs.update(id, {
    audio: undefined
  });;
  return "song deleted"
};

function getSongBlob(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://server.ylight.xyz/proxy/" + url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.send();
  });
}
