import React from "react"
import Skeleton from "@mui/material/Skeleton";

const AlbumSkeleton = () => {
  return (
    <div className="block lg:flex dark:bg-gray-800 mx-auto  lg:gap-24 relative lg:p-16 pt-12 w-full">
      <div className="skeleton--left block w-full p-2 mb-8">
        <Skeleton className="rounded-md mx-auto" variant="rectangular" sx={{ background: "#D3D5DA" }} width={500} height={400} />
      </div>
      <div className="skeleton--right flex flex-col gap-2 min-h-48 w-full px-12">
        <Skeleton className="block rounded-md" variant="rectangular" sx={{ background: "#D3D5DA", width: "100%" }} height={55} />
        <Skeleton className="block rounded-md" variant="rectangular" sx={{ background: "#D3D5DA", width: "75%" }} height={40} />
        <div className="mt-8">
          <Skeleton className="rounded-md " variant="rectangular" sx={{ background: "#D3D5DA" }} width={"65%"} height={50} />
          <Skeleton className="rounded-md" variant="text" sx={{ background: "#D3D5DA" }} width={"100%"} height={35} />
          <div className="controls flex gap-4 mt-4">
            <Skeleton className="rounded-md" variant="rectangular" sx={{ background: "#D3D5DA" }} width={75} height={40} />
            <Skeleton className="rounded-md" variant="rectangular" sx={{ background: "#D3D5DA" }} width={75} height={40} />
            <Skeleton className="rounded-md" variant="rectangular" sx={{ background: "#D3D5DA" }} width={75} height={40} />
            <Skeleton className="rounded-md" variant="rectangular" sx={{ background: "#D3D5DA" }} width={75} height={40} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumSkeleton
