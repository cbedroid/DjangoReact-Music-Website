
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllArtists } from "../features/album"
import Hero from "../components/Hero.jsx";
import VideoSlider from "../components/videoSlider.jsx";


const Home = () => {
  const [artist, setArtist] = useState([{ name: "" }])
  const artists = useSelector(getAllArtists) // artists => all artists
  const all_videos = useSelector(state => state.music.videos)


  useEffect(() => {
    getArtistByName("qwae")
    console.log("Home loaded")
  }, [artists.length > 0, all_videos.length > 0])

  const getArtistByName = (name) => {
    const filtered_artist = artists.filter((artist) => artist.name.toLowerCase().includes(name.toLowerCase()))
    setArtist(filtered_artist[0])
  }


  return (
    <section id="index" className="bg-white dark:bg-gray-800 overflow-hidden relative min-h-screen">
      <Hero artist={artist} />
      <VideoSlider videos={all_videos} />

    </section>
  );
}

export default Home;
