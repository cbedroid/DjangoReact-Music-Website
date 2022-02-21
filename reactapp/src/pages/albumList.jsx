import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton";

import { useSelector, useDispatch } from "react-redux";
import { fetchAlbums, selectAllAlbums } from "../features/album";

const albumList = () => {
  const dispatch = useDispatch()
  const albums = useSelector(selectAllAlbums)
  const [listeners, setListeners] = useState({}) // <-- album listeners not event listener

  useEffect(() => {
    dispatch(fetchAlbums())
    calculateListener()

  }, [albums.length > 0, dispatch])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


  const calculateListener = () => {
    let total_views = {}
    console.clear()
    console.log("Songs views", listeners)
    albums.map(album => {
      const views = album.songs.map((song) => song.views)
      const view_count = views.reduce((view, total) => {
        return view + total
      })
      total_views[album.id] = {}
      total_views[album.id]["total"] = view_count
      total_views[album.id]["monthly"] = view_count > 30 ? Math.ceil(view_count / 30) : 0
      total_views[album.id]["weekly"] = view_count > 7 ? Math.ceil(view_count / 7) : 0

    })
    console.log("Views", total_views)
    // .song[0].views, listeners)

    setListeners(total_views)


  }
  return (
    <div className="wrapper bg-gray-100 dark:bg-gray-800 py-16 min-h-screen">
      <div className="container mx-auto">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} >
            {albums.length > 0 ? (
              albums.map((album, index) => (
                <Grid item xs={2} sm={4} md={4} key={index} >
                  <Item p={0} m={0} >
                    <Link className="hover:bg-gray-800 hover:shadow-xl" to={`/album/${album.id}`}  >
                      <div className="content relative before:absolute before:content-[''] hover:before:bg-gray-900 hover:before:bg-opacity-40 before:block before:w-full before:h-full  before:top-0 before:left-0 before:z-index-30">
                        <img className="w-full object-fit m-0 p-0" src={album.cover} alt={album.name} />
                        <div className="album-details bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 py-8">
                          <h4 className="py-2 text-3xl font-bold">{album.name}</h4>
                          <p className="font-normal" > {listeners[album.id]?.monthly} monthly listeners</p>
                        </div>
                      </div>
                    </Link>
                  </Item>
                </Grid>
              ))
            ) : <Skeleton />
            }
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default albumList
