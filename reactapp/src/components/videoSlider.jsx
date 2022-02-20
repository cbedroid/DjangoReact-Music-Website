import React, { useCallback, useState, useEffect } from "react"
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";



const VideoSlider = ({ videos }) => {
  const [sliderEl, setSliderEl] = useState([])
  const [, updateState] = useState();

  useEffect(() => {
    getSliderEl();
  }, [videos])


  const forceUpdate = useCallback(() => updateState({}), []);
  const getSliderEl = () => {
    const content = videos.map((video => {
      return { ...video, main: videos[1] === video, active: videos.indexOf(video) < 3, classes: videos[1] === video ? "scale-lg" : "scale-sm" }
    }))
    setSliderEl(content)
  }


  const setDefaultSlide = (slide, active = false) => {
    slide.classes = "scale-sm"
    slide.main = false
    slide.active = active
    return slide
  }


  const shiftSlide = (slider) => {
    slider = slider.map((slide) => setDefaultSlide(slide))
    const empty_array = [...Array(3)]
    empty_array.map((_, i) => {
      const classes = i % 2 === 1 ? "scale-lg" : ""
      slider[i] = { ...slider[i], ...{ active: true, main: Boolean(classes), classes: classes || "scale-sm" } }
    })
    setSliderEl(slider)
    forceUpdate()
  }


  const handleLeftButton = () => {
    let slider_copy = sliderEl
    const firstEl = slider_copy.shift()
    slider_copy.push(firstEl)
    shiftSlide(slider_copy)

  }
  const handleRightButton = () => {
    let slider_copy = sliderEl
    const firstEl = slider_copy.pop()
    slider_copy.unshift(firstEl)
    shiftSlide(slider_copy)

  }


  return (
    <div className="bg-gray-100 dark:bg-gray-800" style={{ position: "relative", width: "100%", }}>
      <div className="container mx-auto ">
        <h2 className="text-center text-5xl font-bold dark:text-gray-300 py-8">Videos</h2>
        <div className="video-slider relative">
          <div className="grid grid-cols-3 gap-2 py-16 min-h-44 max-w-8xl mx-auto px-4 my-24">
            {sliderEl.length > 0 ? (
              sliderEl.map((slider, i) => {
                if (slider.active) {
                  return (
                    <div className={`slider-elem ${slider.main ? "shadow-lg hover:shadow-xl" : ""}   ${slider.classes} min-h-96 `} key={i}>
                      <h4 className={`text-lg text-gray-800 dark:text-gray-200 text-center ${slider.main ? "font-bold" : ""} mb-2`}> {slider.name}</h4>
                      <iframe className="rounded-md" src={slider.url} title={slider.title || "video"} frameBorder="0" width="100%" height="400px"></iframe>
                    </div>
                  )
                }
              })
            ) : ([...Array(3)].map((_, i) => {
              return <Skeleton key={i} className="block rounded-md" variant="rectangular" height="300px" />
            }))
            }
          </div>
          <div className="button-wrapper flex self-center items-center absolute top-6 h-4/5 left-0 bg-gray-300 dark:bg-gray-600">
            <Button className="my-auto  dark:hover:bg-gray-700 hover:bg-gray-500  h-full" onClick={handleLeftButton} >
              <Icon sx={{ fontSize: 50, color: "#bbb" }}>chevron_left</Icon>
            </Button>
          </div>
          <div className="button-wrapper flex self-center items-center absolute top-6 h-4/5 right-0 bg-gray-300 dark:bg-gray-600 ">
            <Button className="my-auto dark:hover:bg-gray-700 hover:bg-gray-500 h-full  " onClick={handleRightButton} >
              <Icon sx={{ fontSize: 50, color: "#bbb" }}>chevron_right</Icon>
            </Button>
          </div>
        </div>

      </div>
    </div >

  )
}

export default VideoSlider
