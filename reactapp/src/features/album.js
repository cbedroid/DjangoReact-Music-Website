import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const fetchAlbums = createAsyncThunk("posts/fetchAllAlbums",
  async () => {
    const response = await axios.get("/api/albums/")
    return response.data
  })

export const fetchAllArtists = createAsyncThunk("posts/fetchAllArtists",
  async () => {
    const response = await axios.get("/api/artists/")
    return response.data
  })


export const fetchAllVideos = createAsyncThunk("posts/fetchAllVideos",
  async () => {
    const response = await axios.get("/api/videos/")
    return response.data
  })

export const albumSlice = createSlice({
  name: "music",
  initialState: {
    artists: [],
    albums: [],
    artist_videos: [],
    featured_album: [],
    videos: [],
    status: "idle",
    error: null
  },
  reducers: {
    getFeaturedAlbum: (state) => {
      const featured_album = state.albums.filter(album => album.is_featured)
      state.featured_album = featured_album
      return state
    },
    getArtistVideo: (state) => {
      // console.log("Get Artist Video Reducer Payload ", action.payload)
      const videos = state.videos.map(video => video.artist.id === 1)
      state.artist_videos = videos
      return state

    }
  },
  extraReducers: async (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    await builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload
      return state
    }).addCase(fetchAllArtists.fulfilled, (state, action) => {
      state.artists = action.payload
      return state
    }).addCase(fetchAllVideos.fulfilled, (state, action) => {
      state.videos = action.payload
      return state
    })
  }
})

// First, create the thunk
export const selectAllAlbums = state => state.music.albums;
export const getAllArtists = state => state.music.artists;
export const getAllVideos = state => state.music.videos;
export const { getFeaturedAlbum, getArtistVideos } = albumSlice.actions;
export default albumSlice.reducer
