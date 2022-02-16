import React from "react"

const Skeleton = () => {
  return (
    <div className="dark:bg-gray-800 mx-auto flex lg:gap-24 relative p-16 w-full">
      <div className="flex flex-col flex-1 gap-5 sm:p-16">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-36  rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-1/3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-1/3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-1/3 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-1/3 rounded-2xl"></div>
        </div>
        <div className="mt-auto flex justify-start gap-3 w-full h-1/6">
          <div className="bg-gray-200 w-24 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-24 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-24 animate-pulse rounded-full"></div>
        </div>
      </div>
      <div className="block h-96  sm:w-72 lg:w-1/3 rounded-xl bg-gray-200 animate-pulse py-16"> </div>
    </div>
  )
}

export default Skeleton
