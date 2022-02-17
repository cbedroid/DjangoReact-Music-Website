import axios from "axios"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbums, selectAllAlbums } from "../features/album";
import AlbumSkeleton from "../components/AlbumSkeleton.jsx";
import AudioPlayer from "../components/audioPlayer.jsx"

const Album = ({ match }) => {

  let albumId = match.params.id
  const dispatch = useDispatch()
  const [album, setAlbum] = useState({ songs: [], artist: {} })
  const [songs, setSongs] = useState([{}])
  const [currentSong, setCurrentSong] = useState({})
  const albums = useSelector(selectAllAlbums)

  let apiReady = () => albums.length > 0

  useEffect(() => {
    dispatch(fetchAlbums());
    getAlbumById();
    getSongs();
  }, [apiReady()]);


  const getAlbumById = () => {
    const album_by_id = albums.filter((a) => a.id == albumId)
    return setAlbum(album_by_id[0])
  }

  const getSongs = () => {
    const album = albums.filter((a) => a.id == albumId)[0]
    setCurrentSong(album ? album.songs[0] : {})
    return setSongs(album ? album.songs : [])
  }


  const getAudioDuration = (duration) => {
    duration %= 3600
    const mins = duration / 60  // calculate in minutes
    duration %= 60
    const seconds = duration  // calculate in seconds
    const fs = seconds.toFixed(0)
    return `${mins.toFixed(0)}: ${fs < 10 ? fs + "0" : fs} `  // returns the duration
  }

  const updateSongViews = async (song) => {
    if (song.id !== currentSong.id) { // only update the song if it not current loaded or playing
      const views = song.views + 1
      const response = await axios.patch(`http://127.0.0.1:8000/api/songs/${song.id}/`, { views: views })
      const data = response.data
      let updated_songs = songs.map(song => song.id === data.id ? song = data : song)
      setSongs(updated_songs)
    }
  }

  const handleSongClick = (song) => {
    updateSongViews(song);
    setCurrentSong(song)
  }

  return (
    <section className="relative bg-white dark:bg-gray-800 min-h-screen p-4 py-24">
      {albums.length > 0 && album ? (
        <div className="container mx-auto px-6 flex relative ">
          <div className="bg-gray-200 dark:bg-gray-600 w-full pb-4 rounded-md">
            <div id="album-detail" className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-12 py-16">
              <div className="lg:col-start-2 md:pl-20">
                <h2 className="text-6xl leading-8 font-extrabold  tracking-tight sm:leading-9 mb-4">
                  <span className="block text-gray-600 dark:text-indigo-400 font-bold mb-2">{album.artist.name}</span>
                </h2>
                <h2 className="text-3xl leading-8  text-gray-400 font-semibold pl-3">{album.name}</h2>
                <div className="audio-wrapper mt-8">
                  <AudioPlayer songlist={songs} song={currentSong} songSetter={setCurrentSong} />
                </div>
              </div>
              <div className="mt-16 -mx-4 md:-mx-12 relative lg:mt-0 lg:col-start-1 text-4xl text-gray-200">
                <img className="relative rounded-md shadow-md w-3/5  h-96 mx-auto -translate-y-1/4" src={album ? album.cover : "/images/object/8.jpg"} alt="album cover" />
              </div>
            </div>
            <div id="song-list" className="pl-28 -mt-24">
              <ul className="flex flex-col">
                {songs.length > 0 ? songs.map((song, i) => {
                  return (
                    <li key={i} className="track group hover:bg-indigo-400 hover:drop-shadow rounded-md p-2 ease-in-out duration-400 mb-4 pr-12">
                      <button className="w-full" onClick={() => { handleSongClick(song) }} >
                        <div className="flex items-start justify-between w-full pr-4">
                          <div className="track--left flex">
                            <div id="track-tray" className="flex flex-shrink-0 self-start items-center content-center gap-2 ">
                              <span className="font-bold">{i + 1}</span>
                            </div>
                            <div id="track-detail" className="group ml-4 mb-4">
                              <h5 className="text-lg leading-6 text-gray-900 dark:text-white group-hover:text-indigo-600 ease-in-out font-bold">
                                {song.name}
                              </h5>
                              <small className="flex items-center text-gray-800 dark:text-gray-400 group-hover:text-white font-semibold mt-2 gap-x-2">
                                <span> {album.artist.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000" className="h-3 w-6" viewBox="0 0 512 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" /></svg>
                                <span className="inline italic">{song.views}</span>
                              </small>
                            </div>
                          </div>
                          <div className="track--right">
                            <div className="song-details text-gray-900 dark:text-white py-2">
                              <div className="flex items-center gap-x-6">
                                <i className="far fa-heart"></i>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-4 w-6" viewBox="0 0 512 512"><path d="M448 127.1C448 181 405 223.1 352 223.1C326.1 223.1 302.6 213.8 285.4 197.1L191.3 244.1C191.8 248 191.1 251.1 191.1 256C191.1 260 191.8 263.1 191.3 267.9L285.4 314.9C302.6 298.2 326.1 288 352 288C405 288 448 330.1 448 384C448 437 405 480 352 480C298.1 480 256 437 256 384C256 379.1 256.2 376 256.7 372.1L162.6 325.1C145.4 341.8 121.9 352 96 352C42.98 352 0 309 0 256C0 202.1 42.98 160 96 160C121.9 160 145.4 170.2 162.6 186.9L256.7 139.9C256.2 135.1 256 132 256 128C256 74.98 298.1 32 352 32C405 32 448 74.98 448 128L448 127.1zM95.1 287.1C113.7 287.1 127.1 273.7 127.1 255.1C127.1 238.3 113.7 223.1 95.1 223.1C78.33 223.1 63.1 238.3 63.1 255.1C63.1 273.7 78.33 287.1 95.1 287.1zM352 95.1C334.3 95.1 320 110.3 320 127.1C320 145.7 334.3 159.1 352 159.1C369.7 159.1 384 145.7 384 127.1C384 110.3 369.7 95.1 352 95.1zM352 416C369.7 416 384 401.7 384 384C384 366.3 369.7 352 352 352C334.3 352 320 366.3 320 384C320 401.7 334.3 416 352 416z" /></svg>
                                <div className="dropdown">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 512 512"><path d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z" /></svg>
                                </div>
                                <div id="track-duration">
                                  {getAudioDuration(song.duration)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>)
                }
                )
                  : <li className="text-white text-4xl text-center font-bold p-8">No Content</li>
                }
              </ul>
            </div>
          </div>
        </div>)
        : (<AlbumSkeleton />)}
    </section>
  )
}

export default Album
