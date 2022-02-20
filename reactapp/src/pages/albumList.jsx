import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchAlbums())

  }, [albums.length > 0, dispatch])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="wrapper bg-gray-200 dark:bg-gray-800 py-16 min-h-screen">
      <div className="container mx-auto">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {albums.length > 0 ? (
              albums.map((album, index) => (
                <Grid item xs={2} sm={4} md={4} key={index} >
                  <Item p={0} m={0} >
                    <Link to={`/album/${album.id}`}  >
                      <img className="w-full m-0 p-0" src={album.cover} alt={album.name} />
                      <h4 className="py-8 text-gray-700 text-3xl font-bold">{album.name}</h4>
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
