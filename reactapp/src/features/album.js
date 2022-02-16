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

export const albumSlice = createSlice({
  name: "album",
  initialState: {
    artists: [],
    albums: [],
    featured_album: [],
    status: "idle",
    error: null
  },
  reducers: {
    getFeaturedAlbum: (state) => {
      const featured_album = state.albums.filter(album => album.is_featured)
      state.featured_album = featured_album
      return state
    },
  },
  extraReducers: async (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    await builder.addCase(fetchAlbums.fulfilled, (state, action) => {

      state.albums = action.payload
      return state
    }).addCase(fetchAllArtists.fulfilled, (state, action) => {
      state.artists = action.payload
      return state
    })
  },
})

// First, create the thunk

export const selectAllAlbums = state => state.album.albums;
export const getAllArtists = state => state.album.artists;
export const { getFeaturedAlbum } = albumSlice.actions;
export default albumSlice.reducer
