// import React from "react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "./skeleton.jsx"
import { Link } from "react-router-dom"
import { fetchAlbums, selectAllAlbums, getFeaturedAlbum } from "../features/album";

const Hero = ({ artist }) => {
  const dispatch = useDispatch()
  const albums = useSelector(selectAllAlbums)
  const featured_album = useSelector(state => state.album.featured_album)
  let apiStatus = useSelector(state => state.album.status)

  useEffect(() => {
    dispatch(fetchAlbums())
    if (apiStatus === "idle") {
      dispatch(getFeaturedAlbum())

    }
  }, [apiStatus, dispatch])


  return (
    <section id="header">
      <div className="bg-white dark:bg-gray-800 flex relative z-20 items-start overflow-hidden py-12">
        {albums.length > 0 ? (
          <div className="container mx-auto px-6 flex relative">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
              <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
              </span>
              <h2 className="font-bebas-neue uppercase text-4xl sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                {albums.length > 0 ? albums[0]?.artist.name : "Loading..."}
              </h2>
              <div className="subtitle mt-4 pl-4">
                <span className="block font-bebas-neue uppercase text-2xl sm:text-3xl text-indigo-500">
                  {featured_album.length > 0 ? featured_album[0]?.name : "It's today or never."}
                </span>
                <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-4">
                  Young talented prodigy from the small town of GreenWood,Mississippi is taking over the sound wave with new lyrics.
                </p>
              </div>
              <div className="flex mt-8">
                <Link to={`/album/${featured_album.id || 2}`} className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                  View Album
                </Link>
                <a href="/" className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md">
                  Read more
                </a>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 text-gray-200 relative">
              {artist?.length !== 0 ?
                <img className="mx-auto w-full h-[700px]" src={artist ? artist.image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.alhaya-medical.com%2Fwp-content%2Fuploads%2F2017%2F10%2FLoading-GIF-Image-4.gif&f=1&nofb=1"} alt="artist" />
                :
                <Skeleton />
              }
            </div>
          </div>
        ) : (
          <Skeleton />
        )
        }
      </div>
    </section>
  );
}

export default Hero;
