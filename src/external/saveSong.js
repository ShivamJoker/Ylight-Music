import Dexie from "dexie";

// Define your database
const db = new Dexie("Song_Database");

// create new databse
// our schema is of storing a song
db.version(1).stores({
  songs:
    "&videoId, rating, title, channelTitle, timestamp, playbackTimes, [rating+timestamp]"
});

// object  of every new song
const videoObj = {
  videoId: "3dfds45s63",
  timestamp: Date.now(),
  title: "2 new sample video is here",
  playbackTimes: 1,
  rating: "none"
};

const data = {
  id: "a11",
  title: "hello bro",
  channelTitle: "fuck me"
};

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
export const rateSong = async (id, rating, audioEl) => {

  // if user likes the song then only download it
  if (rating === "liked") {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://cors-anywhere.herokuapp.com/" + audioEl.src);
    xhr.responseType = "blob";
    xhr.onload = e => {
      
      alert("download completed");
      db.songs.update(id, {
        audio: xhr.response
      });
    };
    xhr.send();
  }
 
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
    .where("[rating+timestamp]")
    .between(["liked", Dexie.minKey], ["liked", Dexie.maxKey])
    .reverse()
    .toArray();
  return likedSongs;
};
