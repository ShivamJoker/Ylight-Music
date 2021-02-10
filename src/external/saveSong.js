import Dexie from 'dexie';
import 'dexie-observable';
import { promised } from 'q';
import { promises } from 'fs';

// Define your database
export const db = new Dexie('Song_Database');

// create new databse
// our schema is of storing a song
db.version(1).stores({
  songs:
    '&videoId, timestamp, playbackTimes, [rating+timestamp], [downloadState+timestamp]',
});

db.version(2).stores({});

// add or update song on play
export const updatePlayingSong = async (data) => {
  const videoObj = {
    videoId: data.id,
    timestamp: Date.now(),
    title: data.title,
    channelTitle: data.channelTitle,
    playbackTimes: 1,
  };

  const song = await db.songs.get({ videoId: data.id });
  // if song exists we will just update the timestamp and the playback
  if (song) {
    db.songs.update(data.id, {
      timestamp: Date.now(),
      playbackTimes: song.playbackTimes + 1,
    });
    // console.log("song updated");
    return song.rating;
    // return the rating
  } else {
    // we will add a new song
    // console.log("song added");
    db.songs.add(videoObj);
  }
};

// like or dislike a song on database
export const rateSong = async (id, rating) => {
  // if user likes the song then only download it

  db.songs.update(id, {
    rating: rating,
  });
};

export const getHistory = async () => {
  const songsByTimeStamp = await db.songs
    .orderBy('timestamp')
    .limit(500)
    .reverse()
    .toArray();
  return songsByTimeStamp;
};

export const getLikedSongs = async () => {
  const likedSongs = await db.songs
    .where('[rating+timestamp]') //this will filter song based on time and liked
    .between(['liked', Dexie.minKey], ['liked', Dexie.maxKey])
    .reverse()
    .toArray();
  return likedSongs;
};

export const getDownloadedSongs = async () => {
  const downloadedSongs = await db.songs
    .where('[downloadState+timestamp]') //this will filter song based on time and downloaded
    .between(['downloaded', Dexie.minKey], ['downloaded', Dexie.maxKey])
    .reverse()
    .toArray();
  return downloadedSongs;
};

export const removeDownloadingState = async () => {
  // find all the downloadState which is downloading and remove that
  const songs = await db.songs
    .where('[downloadState+timestamp]')
    .between(['downloading', Dexie.minKey], ['downloading', Dexie.maxKey])
    .modify((x) => {
      delete x.downloadState;
    });
  // console.log(songs);
};

export const downloadSong = async (id, url) => {
  try {
    db.songs.update(id, {
      downloadState: 'downloading',
    });
    const thumbURL = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    const [thumbnailBlob, songBlob] = await Promise.all([
      fetchProxiedBlob(thumbURL),
      fetchProxiedBlob(url),
    ]);
    db.songs.update(id, {
      downloadState: 'downloaded',
      thumbnail: thumbnailBlob,
      audio: songBlob,
    });
    return 'downloaded';
  } catch (error) {
    return error;
  }
};

export const deleteSongAudio = async (id) => {
  await db.songs.where({ videoId: id }).modify((x) => {
    delete x.audio;
    delete x.downloadState;
  });
  return 'song deleted';
};

function fetchProxiedBlob(url) {
  const URL = url;
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://server.ylight.xyz/proxy/' + URL);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.send();
    setTimeout(() => {
      xhr.abort();
      xhr.open('GET', 'https://server.ylight.xyz/proxy/' + URL);

      xhr.send();
    }, 1000);
  });
}
