import React, { useRef, useState, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faFastBackward, faFastForward, faStop, faPause, faShareSquare } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
// import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

library.add(faHeart)

function MusicPlayer({ songlist, song, songSetter }) {
  let audioRef = useRef(null)

  const [track, setCurrentTrack] = useState({})
  const playRef = useRef(null)
  const pauseRef = useRef(null)
  const stopRef = useRef(null)
  const rewRef = useRef(null)
  const ffRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    if (song !== track) audioRef.current.audio.current.src = song.audio
    setCurrentTrack(song)
  })

  const loadAudio = () => {
    if (!audioRef.current.isPlaying()) audioRef.current.audio.current.src = song.audio
    handleButtonEvent("pause")
  }
  const handleButtonEvent = (event) => {
    const play_button = playRef.current
    const pause_button = pauseRef.current
    if (!audioRef.current.isPlaying()) {
      // change play _button to pause _button
      play_button.classList.remove("hidden")
      pause_button.classList.add("hidden")
      audioRef.current.audio.current.play()
    } else if (event === "stop") {
      audioRef.current.audio.current.currentTime = 0
      audioRef.current.audio.current.pause()

    } else {
      play_button.classList.add("hidden");
      pause_button.classList.remove("hidden")
      if (audioRef.current.isPlaying()) audioRef.current.audio.current.pause()
    }
  }

  const setTrack = ({ target }) => {
    if (songSetter && songlist) {
      const comparison_ref = rewRef.current.children[0].children[0]
      const current_song_index = songlist.indexOf(song);
      const next_index = target === comparison_ref ? current_song_index - 1 : current_song_index + 1
      const next_track = (0 >= next_index < songlist.length - 1 ? songlist[next_index] : songlist[0]) || songlist[0]
      songSetter(next_track)
      audioRef.current.audio.current.src = song.audio
    }
  }

  // const handleSeek = (event) => {
  //   if (audioRef.current.isPlaying()) {
  //     let seek_pos = event === "rewind" ? -3 : 3
  //     audioRef.current.audio.current.currentTime += seek_pos
  //   }

  // }


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
        <div className="progress-bar">
          <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
            <div className="w-0 h-full text-center text-xs text-white bg-indigo-500 rounded-md" ref={progressRef}>
            </div>
          </div>
        </div>
      </div>
      <div className="audio-buttons">
        <div className="flex gap-x-4 p-4">
          <button ref={rewRef} onClick={setTrack}  >
            <FontAwesomeIcon className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={faFastBackward} size="2x" />
          </button>

          <button ref={playRef} onClick={loadAudio}>
            <FontAwesomeIcon className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={faPlay} size="2x" />
          </button>

          <button className="hidden" ref={pauseRef} onClick={() => handleButtonEvent("play")} >
            <FontAwesomeIcon
              className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60"
              icon={faPause} size="2x"
            />
          </button>
          <button ref={ffRef} onClick={setTrack}  >
            <FontAwesomeIcon className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={faFastForward} size="2x" />
          </button>

          <button ref={stopRef} onClick={() => handleButtonEvent("stop")} >
            <FontAwesomeIcon
              className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={faStop} size="2x"
            />

          </button>
          <FontAwesomeIcon className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={faShareSquare} size="2x" />
          <FontAwesomeIcon className="text-gray-400  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={["far", "heart"]} size="2x" />
        </div>
      </div>
    </div>

  )
}

export default MusicPlayer
