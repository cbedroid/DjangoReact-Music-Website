import React from "react";
import Logo from "../static/assets/images/site-logo.png"
import { Link } from "react-router-dom";

const nav_links = ["Home", "Music", "About"];

function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-700 text-gray-700  dark:text-gray-200 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="rounded-full drop-shadow bg-white h-16 w-16" src={Logo} alt="site-logo" />
          <span className="ml-3 dark:text-gray-200 text-xl font-semibold">QwaeTheGoat</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          {/* Fix link 'to' route */}
          {nav_links.map((link, i) => <Link to="/home" className="mr-5 hover:text-gray-400 dark:hover:text-blue-400" key={i}>{link}</Link>)}
        </nav>
        <button className="inline-flex items-center text-gray-200 hover:text-gray-600 hover:drop-shadow bg-gray-600 border-0 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 py-1 px-3">Button
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>)

}

export default Header;
