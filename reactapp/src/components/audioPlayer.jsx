import React, { useRef } from "react"


import AudioPlayer from "react-h5-audio-player";
import AudioControls from "./audioControl.jsx"

function MusicPlayer({ songlist, song, songSetter }) {

  const audioRef = useRef(null)
  const progressRef = useRef(null)

  const handleProgressBar = () => {
    const audio_duration = audioRef.current.audio.current.duration
    const audio_current_time = audioRef.current.audio.current.currentTime
    const progress_bar = progressRef.current
    const current_pos = 100 * (audio_current_time / audio_duration)
    progress_bar.style.width = `${current_pos.toPrecision()}%`

  }

  return (

    <div id="audio-player" className="mr-4">
      <div className="song-title text-2xl font-semibold  text-gray-800 dark:text-gray-200 py-2">{song?.name}</div>
      <div className="player-detail">
        <AudioPlayer className="p-4 hidden bg-black rounded-md w-full"
          ref={audioRef}
          autoPlay
          onListen={handleProgressBar}
        />
      </div>
      <AudioControls audioRef={audioRef} progressRef={progressRef} song={song} songlist={songlist} songSetter={songSetter} />
    </div>

  )
}

export default MusicPlayer
