import Dexie from "dexie";
// Define your database

var db = new Dexie("Song_Database");
db.version(1).stores({
  songs: "videoId, rating, title, channel"
});

//
// Put some data into it
//
db.songs
  .put({ videoId: "123", channel: "boy boy" })
  .then(function() {
    // Then when data is stored, read from it
    console.log("Song added");
  })
  .catch(function(error) {
    // Finally don't forget to catch any error
    // that could have happened anywhere in the
    console.log("Ooops: " + error);
  });
db.songs
  .put({ id: "123", channel: "boy boy" })
  .then(function() {
    // Then when data is stored, read from it
    console.log("Song added");
  })
  .catch(function(error) {
    // Finally don't forget to catch any error
    // that could have happened anywhere in the
    console.log("Ooops: " + error);
  });
