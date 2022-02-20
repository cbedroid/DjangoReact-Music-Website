import React, { useRef, useState, useEffect } from "react";
import Logo from "../static/assets/images/site-logo.png"
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";


function Header() {
  const nav_links = [{ route: "/", name: "Home" }, { route: "/albums", name: "Music" }, { route: "/", name: "About" }];
  const darkModeRef = useRef(0)
  const [theme, setTheme] = useState("light")

  const handleTheme = () => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }

  }
  useEffect(() => {

    if (!localStorage.theme) {
      localStorage.theme = "light"
    }
    setTheme(localStorage.theme)
    handleTheme()


  }, [1 === 1])

  const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff",
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme !== "dark" ? "#FB8309" : "#003892",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));



  const handleDarkModeSwitch = () => {
    const theme_switch = darkModeRef.current.children[0]
    localStorage.theme = theme_switch.checked ? "dark" : "light"
    setTheme(localStorage.theme)
    handleTheme()

  }
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 body-font">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="rounded-full drop-shadow bg-white h-16 w-16" src={Logo} alt="site-logo" />
          <span className="ml-3 dark:text-gray-200 text-xl font-semibold">QwaeTheGoat</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          {/* Fix link 'to' route */}
          {Array.from(nav_links).map((link, i) => <Link to={link.route} className="mr-5 hover:text-gray-400 dark:hover:text-blue-400" key={i}>{link.name}</Link>)}
        </nav>
        <FormGroup>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={theme === "dark" ? true : false} ref={darkModeRef} onChange={handleDarkModeSwitch} />}
            label="Dark mode"


          />
        </FormGroup>

      </div>
    </header>
  )

}

export default Header;
