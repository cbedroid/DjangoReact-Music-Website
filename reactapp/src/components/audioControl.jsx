import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faFastBackward, faFastForward, faStop, faPause } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import IconButton from "./IconButton.jsx";
import "react-h5-audio-player/lib/styles.css";
library.add(faHeart)

//TODO: Need to lift state to global store
const AudioControl = ({ audioRef, progressRef, song, songlist, songSetter }) => {

  const [track, setCurrentTrack] = useState({})
  const playRef = useRef(null)
  const pauseRef = useRef(null)
  const stopRef = useRef(null)
  const rewRef = useRef(null)
  const ffRef = useRef(null)

  useEffect(() => {
    if (track && song !== track) audioRef.current.audio.current.src = song.audio
    setCurrentTrack(song)
  })

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

  const loadAudio = () => {
    if (!audioRef.current.isPlaying()) audioRef.current.audio.current.src = song.audio
    handleButtonEvent("pause")
  }



  const setTrack = ({ target }) => {
    if (songSetter && songlist) {
      const comparison_ref = rewRef.current.children[0].children[0]
      const current_song_index = songlist.indexOf(song);
      const next_index = target === comparison_ref ? current_song_index - 1 : current_song_index + 1
      const next_track = (0 >= next_index < songlist.length - 1 ? songlist[next_index] : songlist[0]) || songlist[0]
      songSetter(next_track)
      audioRef.current.audio.current.src = next_track.audio
    }
  }

  // const handleSeek = (event) => {
  //   if (audioRef.current.isPlaying()) {
  //     let seek_pos = event === "rewind" ? -3 : 3
  //     audioRef.current.audio.current.currentTime += seek_pos
  //   }

  // }


  return (
    <div id="audio-controls">
      <div className="progress-bar ">
        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
          <div className="w-0 h-full text-center text-xs text-white bg-indigo-500 rounded-md" ref={progressRef}>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-start gap-x-6 p-4 py-8">
        <IconButton click_handler={setTrack} icon={faFastBackward} ref={rewRef} />
        <IconButton click_handler={loadAudio} icon={faPlay} ref={playRef} />
        <IconButton btn_class="hidden" click_handler={() => handleButtonEvent("play")} icon={faPause} ref={pauseRef} />
        <IconButton click_handler={setTrack} icon={faFastForward} ref={ffRef} />
        <IconButton ref={stopRef} icon={faStop} click_handler={() => handleButtonEvent("stop")} />
      </div>
    </div>
  )
}

AudioControl.propTypes = {
  audioRef: PropTypes.object.isRequired,
  progressRef: PropTypes.object.isRequired,
  song: PropTypes.object.isRequired,
  songlist: PropTypes.array.isRequired,
  songSetter: PropTypes.func.isRequired

}


export default AudioControl
