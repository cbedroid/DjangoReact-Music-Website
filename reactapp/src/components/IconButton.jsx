import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const IconButton = React.forwardRef(({ btn_class, click_handler, icon }, ref) => {
  return (
    <button className={`${btn_class}`} ref={ref} onClick={click_handler} >
      <FontAwesomeIcon className="text-gray-500  hover:text-opacity-60 dark:text-gray-900  dark:hover:text-opacity-60" icon={icon} size="2x" />
    </button>
  )
})

IconButton.defaultProps = {
  click_handler: PropTypes.func,
  icon: PropTypes.elem,
  btn_class: PropTypes.string

}
export default IconButton
