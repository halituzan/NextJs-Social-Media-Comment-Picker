import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  YTUrl:
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100",
  link: "",
  status: false,
  resultPage: 0,
  videoId: "",
  reVideoId: "",
  pick: {},
  sameFilter: false,
  wordFilterStatus: false,
  wordFilterWord: "",
  seconds: 1,
  comments: [],
  nextPageToken: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addLink: (state, { payload }) => {
      state.link = payload;
    },
    setOnlyVideoId: (state) => {
      state.videoId = "";
    },
    addVideoId: (state, { payload }) => {
      state.videoId = payload;
      state.reVideoId = payload;
    },
    changeStatus: (state, { payload }) => {
      state.status = payload;
    },
    setComments: (state, { payload }) => {
      state.comments.push(payload);
    },
    setPick: (state, { payload }) => {
      state.pick = payload;
    },
    sameFilters: (state, { payload }) => {
      state.sameFilter = payload;
    },
    wordFilters: (state, { payload }) => {
      if (typeof payload == "boolean") {
        state.wordFilterStatus = payload;
      } else {
        state.wordFilterWord = payload;
      }
    },
    setSeconds: (state, { payload }) => {
      state.seconds = payload;
    },
    setNextPageToken: (state, { payload }) => {
      state.nextPageToken = payload;
    },
  },
});

export const {
  addLink,
  addVideoId,
  changeStatus,
  setComments,
  setPick,
  sameFilters,
  wordFilters,
  setSeconds,
  setNextPageToken,
  setOnlyVideoId,
} = dataSlice.actions;
export const dataSelector = (state) => state;
export default dataSlice.reducer;
