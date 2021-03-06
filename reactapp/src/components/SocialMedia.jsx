import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SocialMedia = ({ social_list }) => {
  return (
    <div className="wrapper relative top-30 left-0 block  text-gray-800 dark:text-gray-300 h-48 p-8">
      <h1 className="text-4xl font-bold">Social Link</h1>
      <ul className="flex text-gray-300 gap-x-8 my-4">
        {social_list ? (
          social_list?.map((social_icon, i) => (
            <li key={i} className="text-3xl bg-gray-100 dark:bg-gray-900  shadow-md hover:bg-gray-300 dark:hover:shadow-white hover:ring-2 hover:ring-gray-300  dark:hover:ring-gray-700  hover:shadow-xl rounded-full p-2">
              <a href={social_icon.link} target="_blank" rel="noreferrer" >
                <i className={`${social_icon.icon} text-center  w-10`} style={{ color: social_icon.color }}></i>
              </a>
            </li>
          )
          )
        ) : (
          [...Array(5)].map((_, i) => (
            <div className="wrapper" key={i}>
              <Skeleton className="bg-gray-600" animation="pulse" variant="circular" width={55} height={55} />
            </div>
          )
          ))
        }
      </ul>
    </div>
  )
}

export default SocialMedia;
