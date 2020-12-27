import React from "react";
import './index.css'
import "./App.css"

const Footer = () => (
  <footer className="footer py-2">
     <div className="container-fluid">
       <div className="row">
         <div className="col-sm-6">
           <span className="pb-3 h5" id="contact">Contact: <a href="https://github.com/eric5605" className="px-3"> GitHub </a>
           <a href="https://www.linkedin.com/feed/"> LinkedIn </a></span>
         </div>
       <div className="col-sm-6">
         <span className="float-right">Copyright © Eric A. Herman Ltd. 2020. All Rights Reserved</span>
         </div>
       </div>
     </div>
   </footer>
);

export default Footer;
