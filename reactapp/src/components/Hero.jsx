import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom"
import { selectAllAlbums, getFeaturedAlbum } from "../features/album";
import SocialMedia from "../components/SocialMedia.jsx";


const Hero = ({ artist }) => {
  const dispatch = useDispatch()
  const albums = useSelector(selectAllAlbums)
  const featured_album = useSelector(state => state.music.featured_album)
  let apiStatus = useSelector(state => state.music.status)

  useEffect(() => {
    if (apiStatus === "idle") {
      dispatch(getFeaturedAlbum())
    }
  }, [apiStatus, dispatch])

  return (
    <section id="index-hero">
      <div className="wrapper">
        <SocialMedia social_list={artist?.socialmedia} />
        <div className="dark:bg-transparent flex relative z-20 items-start overflow-hidden py-12" >
          {albums.length > 0 ? (
            <div className="container mx-auto px-6 flex relative">
              <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                </span>
                <h2 className="font-bebas-neue m-title uppercase text-4xl sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  {albums.length > 0 ? albums[0]?.artist.name : "Loading..."}
                </h2>
                <div className="subtitle mt-4 pl-4">
                  <span className="block font-bebas-neue uppercase text-2xl sm:text-3xl text-indigo-600 dark:font-bold">
                    {featured_album.length > 0 ? featured_album[0]?.name : "It's today or never."}
                  </span>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-4">
                    {albums[0].artist.description}
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
                  <img className="mx-auto w-[700px] h-[700px] rounded-md shadow-lg" src={artist ? artist.image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.alhaya-medical.com%2Fwp-content%2Fuploads%2F2017%2F10%2FLoading-GIF-Image-4.gif&f=1&nofb=1"} alt="artist" />
                  :
                  <Skeleton variant="rectangular" width="700px" height="700px" />
                }
              </div>
            </div>
          ) : (

            <div className="container mx-auto px-6 flex flex-col relative">
              <Skeleton className="rounded-md" variant="text" width="400px" height="75px" />
              <Skeleton className="rounded-md" variant="text" width="400px" height="55px" />
              <Skeleton className="rounded-md" variant="text" width="400px" height="165px" />
              <div className="flex gap-x-2">
                <Skeleton className="rounded-md" variant="rectangular" width="85px" height="45px" />
                <Skeleton className="rounded-md" variant="rectangular" width="85px" height="45px" />
              </div>
            </div>
          )
          }
        </div>
      </div>
    </section>
  );
}

export default Hero;
