import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types";


// eslint-disable-next-line react/display-name
const IconButton = React.forwardRef(({ btn_class, click_handler, icon }, ref) => {
  const [buttonSize, setButtonSize] = useState("2x")
  const large_screen_min_width = 1025

  useEffect(() => {
    // set starting button size based on window width

    const initial_size = window.innerWidth >= large_screen_min_width ? "3x" : "1x"
    setButtonSize(initial_size)
    window.addEventListener("resize", (e) => {
      handleButtonSize(e)
    })

  }, [])

  const handleButtonSize = ({ target }) => {
    const screen_width = target.innerWidth
    const button_size = screen_width >= large_screen_min_width ? "3x" : "1x"
    setButtonSize(button_size)

  }


  return (
    <button className={`${btn_class}`} ref={ref} onClick={click_handler} >
      <FontAwesomeIcon className="text-gray-500 hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={icon} size={buttonSize} />
    </button>
  )
})

IconButton.defaultProps = {
  click_handler: PropTypes.func,
  icon: PropTypes.elem,
  btn_class: PropTypes.string

}
export default IconButton
