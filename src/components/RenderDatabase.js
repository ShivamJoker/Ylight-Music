import React, { useContext, useState, useEffect } from "react";
// import {
//   List,
//   AutoSizer,
//   CellMeasurer,
//   CellMeasurerCache
// } from "react-virtualized";

import { DynamicSizeList as List } from "react-window";


import CompletedTick from "../images/CompletedTick.svg";
import DownloadIcon from "../images/DownloadIcon.svg";

import {
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText
} from "@material-ui/core";

import DownloadDeleteDialog from "./DownloadDeleteDialog";

import { GlobalContext } from "./GlobalState";

import getAudioLink from "../apis/getAudioLink";
import { downloadSong, deleteSongAudio } from "../external/saveSong";

// const cache = new CellMeasurerCache({
//   minHeight: 50,
//   defaultHeight: 60,
//   fixedWidth: true
//   // keyMapper: () => 1
// });

let currentId;

export const useSongMethods = songId => {
  const [{}, dispatch] = useContext(GlobalContext);

  const setSnackbarMsg = React.useCallback(
    data => {
      dispatch({ type: "setSnackbarMsg", snippet: data });
    },
    [dispatch]
  );

  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const [dontAskPopup, setDontAskPopup] = useState(null);

  useEffect(() => {
    //convert string to bool
    const popupLocalState = localStorage.getItem("dontAskPopup") === "true";
    setDontAskPopup(popupLocalState);
    // for popup settings
  }, []);

  const handleDownload = async songId => {
    // console.log("here is the id", songId);
    const res = await getAudioLink.get("/song", {
      params: { id: songId }
    });
    // first we will fetch the song link then we will download it
    // the download song function takes id and the url
    const status = await downloadSong(songId, res.data);
    // after the downloading is done we will remove the downloading class
    // set the snackbar message
    setSnackbarMsg("Song Downloaded");
    console.log("song status", status);
  };

  const disablePopup = () => {
    localStorage.setItem("dontAskPopup", true);
    setDontAskPopup(true);
  };

  const deleteTheSong = async checkBox => {
    const deleted = await deleteSongAudio(currentId);
    setDeleteDialogState(false);
    setSnackbarMsg("Deleted Successfully");

    console.log(currentId, checkBox);
    // we will set it to localstorage the popup option
    if (checkBox) {
      disablePopup();
    }
  };

  // hadnling download dialog
  const handleRemoveSong = songId => {
    console.log("handle remove dude");
    currentId = songId;
    // when user clicks on the download badge we will check the state
    // then delete the song without showing the popup if dontAskPopup is true
    // and delete the song by calling deleteTheSong
    dontAskPopup ? deleteTheSong() : setDeleteDialogState(true);
  };

  const deleteDialogComponent = dontAskPopup ? null : (
    <DownloadDeleteDialog
      isOpen={deleteDialogState}
      handleCancel={() => setDeleteDialogState(false)} // we will just hide the dialog on cancel
      handleDelete={deleteTheSong} //if user wants to delete the song we will just do it
    />
  );

  return {
    handleDownload,
    handleRemoveSong,
    deleteTheSong,
    dontAskPopup,
    setDeleteDialogState,
    deleteDialogState,
    deleteDialogComponent
  };
};

const RenderDatabase = props => {
  const songs = props.songs;
  const [{}, dispatch] = useContext(GlobalContext);
  const setCurrentVideoSnippet = data => {
    dispatch({ type: "setCurrentVideoSnippet", snippet: data });
  };
  const setSnackbarMsg = data => {
    dispatch({ type: "setSnakbarMsg", snippet: data });
  };

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleClick = song => {
    // set all the info of current clicked video in this object
    setCurrentVideoSnippet({
      id: song.videoId,
      audio: song.audio,
      thumbnail: song.thumbnail,
      title: song.title,
      channelTitle: song.channelTitle,
      maxThumbnail: `https://img.youtube.com/vi/${song.videoId}/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${song.videoId}/sddefault.jpg`
      // this is the url of the max resolution of thumbnail
    });
  };

  const {
    handleDownload,
    handleRemoveSong,
    deleteDialogComponent
  } = useSongMethods();

  const returnAnimatedClass = song => {
    if (song.downloadState === "downloading") {
      console.log(song.downloadState);
      return "downloading-animation";
    } else {
      return "";
    }
  };




  useEffect(() => {
    setWindowHeight(window.innerHeight);
  });

  const renderResult = songs.map((song, index) => {
    return (
      <>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => handleClick(song)}
          // component={Link}
          // to={{ pathname: "/play", search: `?id=${song.videoId}`, state: { modal: true } }}
        >
          <ListItemAvatar>
            <Avatar
              className="searchThumb"
              style={{ width: "60px", height: "60px", marginRight: "15px" }}
              alt={song.title}
              src={`https://img.youtube.com/vi/${song.videoId}/default.jpg`}
            />
          </ListItemAvatar>
          {/* we will play the song when clicked on title */}
          <ListItemText
            primary={song.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {song.channelTitle}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <div
          className="download-container"
          onClick={() =>
            song.audio
              ? handleRemoveSong(song.videoId)
              : handleDownload(song.videoId)
          }
        >
          <div className="badge-container">
            {/* if there is audio file then we will show tick mark icon */}
            <img
              className={returnAnimatedClass(song)}
              src={song.audio ? CompletedTick : DownloadIcon}
              alt="downloading icon"
            />
          </div>
        </div>
      </>
    );
  });

  const renderItem = React.forwardRef((row, ref) => (
    <div
      ref={ref}
      style={{
        ...row.style,
        maxWidth: "1000px",
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      {renderResult[row.index]}
      <Divider />
    </div>
  ));
  return (
    <>
      {deleteDialogComponent}

      <List
        height={windowHeight}
        itemCount={songs.length}
        width={window.innerWidth}
      >
        {renderItem}
      </List>
    </>
  );
};

export default RenderDatabase;
