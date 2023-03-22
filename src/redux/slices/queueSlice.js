import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    playlist: null,
    songs: null,
    playlistId: null,
    queueId: 0,
    isPlaying: false,
  },
  reducers: {
    setQueueId(state, action) {
      state.queueId = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },
    setSongs(state, action) {
      state.songs = action.payload;
      state.queueId = 0;
    },
    setPlaylistId(state, action) {
      state.playlistId = action.payload;
    },
    setLikeSong(state, action) {
      if (state.playlist != null) {
        state.playlist.songs.map((song) => {
          if (song.id === action.payload) {
            song.isLiked = !song.isLiked;
          }
          return song;
        });
      }
      if (state.songs != null) {
        state.songs.map((song) => {
          if (song.id === action.payload) {
            song.isLiked = !song.isLiked;
          }
          return song;
        });
      }
    },
    removeSong(state, action) {
      if (state.playlist != null) {
        state.playlist.songs = state.playlist.songs.filter(
          (song) => song.id != action.payload
        );
      }
    },
  },
});

export const {
  setQueueId,
  setPlaylist,
  setSongs,
  setIsPlaying,
  setLikeSong,
  setPlaylistId,
  removeSong,
} = queueSlice.actions;

export default queueSlice.reducer;
