import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  YTUrl:
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100",
  link: "",
  status: false,
  resultPage: 0,
  videoId: "",
  reVideoId: "",
  pick: "",
  sameFilter: false,
  wordFilterStatus: false,
  wordFilterWord: "",
  seconds: 1,
  comments: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addLink: (state, { payload }) => {
      state.link = payload;
    },
    addVideoId: (state, { payload }) => {
      state.videoId = payload;
      state.reVideoId = payload;
    },
    changeStatus: (state, { payload }) => {
      state.status = payload;
    },
    setComments: (state, { payload }) => {
      if (payload.length > 0) {
        const newComments = [...state.comments];
        newComments.push({
          authorDisplayName: payload.authorDisplayName,
          authorChannelUrl: payload.authorChannelUrl,
          authorProfileImageUrl: payload.authorProfileImageUrl,
          textDisplay: payload.textDisplay,
          textOriginal: payload.textOriginal,
          updatedAt: payload.updatedAt,
        });
        state.comments = newComments;
      } else {
        state.comments = payload;
      }
    },
    pick: (state, { payload }) => {
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
  },
});

export const {
  addLink,
  addVideoId,
  changeStatus,
  setComments,
  pick,
  sameFilters,
  wordFilters,
  setSeconds
} = dataSlice.actions;
export const dataSelector = (state) => state;
export default dataSlice.reducer;
