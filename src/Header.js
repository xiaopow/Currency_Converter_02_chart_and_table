import React from 'react'
import './App.css'

import { BrowserRouter as Link } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
      <nav className="navbar justify-content-center">
        <Link to="/"><span className="navbar-brand mb-0 headline">Currency Exchange Rates</span></Link>
      </nav>
    </React.Fragment>
  )
}

export default Header
