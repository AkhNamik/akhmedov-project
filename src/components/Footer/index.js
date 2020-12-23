import React from "react"
import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-box">
          <p>Namik Akhmedov</p>
          <p> © 2020</p>
          <p>ahmedov.namik@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}
export default React.memo(Footer)
