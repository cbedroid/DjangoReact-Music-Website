import React from "react"
import PropTypes from "prop-types"

const Video = props => {
  return (
    <div className="video-wrapper">
      {props.type === "iframe" ? (
        <iframe className={`rounded-md ${props.className || ""}`} src={props.src} title={props.title || "video"} frameBorder="0" width={props.width || "800px"} height={props.height || "500px"}></iframe>
      )
        : (
          <video className={`video ${props.className || ""}`} src={props.src} width={props.width || "800px"} height={props.height || "500px"}>
            <track kind="captions" src={props.src}></track>
          </video>
        )
      }
    </div>
  )
}
Video.propTypes = {
  url: PropTypes.string.isRequired
}

export default Video
