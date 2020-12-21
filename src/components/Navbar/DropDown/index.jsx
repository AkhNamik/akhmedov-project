import React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import API from "../../../API"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const DropDown = ({ dispatch}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleQuit = () => {
    setAnchorEl(null)
    localStorage.removeItem("authToken")
    dispatch({ type: "login/exit" })
    API.setHeader("Authorization", "")
    dispatch({ type: "data/error" })
  }
  return (
    <div>
      <Button aria-controls="simple-menu" onClick={handleClick}>
        Мой профиль
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/account">
          <MenuItem onClick={handleClose}>Профиль</MenuItem>
        </Link>
        <Link to="/">
          <MenuItem onClick={handleQuit}>Выйти</MenuItem>
        </Link>
      </Menu>
    </div>
  )
}


export default connect(null)(DropDown)
