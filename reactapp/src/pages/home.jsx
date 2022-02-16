
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllArtists, getAllArtists } from "../features/album"
import Hero from "../components/Hero.jsx";
import SocialMedia from "../components/SocialMedia.jsx";


const Home = () => {
  const dispatch = useDispatch()
  const artists = useSelector(getAllArtists)
  const [artist, setArtist] = useState([{ name: "" }])

  useEffect(() => {
    dispatch(fetchAllArtists())
    getArtistByName("qwae")
  }, [artists.length > 0])

  const getArtistByName = (name) => {
    const filtered_artist = artists.filter((artist) => artist.name.toLowerCase().includes(name.toLowerCase()))
    setArtist(filtered_artist[0])
  }

  return (
    <div id="index" className="bg-white dark:bg-gray-800 overflow-hidden relative min-h-screen">
      <SocialMedia social_list={artist?.socialmedia} />
      <Hero artist={artist} />
    </div>
  );
}

export default Home;
