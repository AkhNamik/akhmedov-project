import React from "react"
import { connect } from "react-redux"
import { fetchUser, postMutationUser } from "./fetchUser"
import jwt_decode from "jwt-decode"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Button, TextField } from "@material-ui/core"
import { ENDPOINT } from "../../API"
const useStyles = makeStyles({
  root: {
    width: "50%",
    padding: "20px",
    margin: "50px auto",
    boxShadow: "0 0 3px 0 black",
  },
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    textAlign: "center",
  },
  boxAvatarImg: {
    width: "200px",
    height: "200px",
    marginBottom: "20px",
  },
  boxContent: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    background: "#cccccc",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0 0 1px 0 black",
    margin: "20px auto",
  },
  boxContentButton: {
    margin: "20px auto",
  },
  boxContentChangeButton: {
    display: "flex",
    justifyContent: "space-between",
  },
})
const UserInfo = ({ isLoggedIn, dispatch, account }) => {
  const [values, setValues] = React.useState(null)
  const [isValue, setIsValue] = React.useState({})
  const [status, setStatus] = React.useState("idle")
  React.useEffect(() => {
    const decode = jwt_decode(localStorage.getItem("authToken"))
    const id = decode.sub.id
    if (isLoggedIn) {
      dispatch(fetchUser(id))
    }
    if (status === "pending") {
      dispatch(fetchUser(id))
      setStatus("idle")
    }
  }, [status])
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(postMutationUser(values))
    setStatus("pending")
    setValues(null)
  }
  const handleChangeNick = () => {
    setIsValue({ _id: account._id, nick: null })
    setStatus("get")
  }
  const handleChangeAddresses = () => {
    setIsValue({ _id: account._id, addresses: null })
    setStatus("get")
  }
  const handleChangePhones = () => {
    setIsValue({ _id: account._id, phones: null })
    setStatus("get")
  }
  if (status === "get") {
    dispatch(postMutationUser(isValue))
    setStatus("pending")
  }
  const onChange = (e) => {
    const target = e.target
    setValues((prev) => ({
      ...prev,
      _id: account._id,
      [target.name]: target.value,
    }))
  }
  const onChangeAvatar = (e) => {
    const formData = new FormData()
    formData.append("photo", e.target.files[0]) 
    fetch(`${ENDPOINT}/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setIsValue({
          _id: account._id,
          avatar: {
            _id: res._id,
          },
        })
        setStatus("changePhoto")
      })
  }
  if (status === "changePhoto") {
    dispatch(postMutationUser(isValue))
    setStatus("pending")
  }
  const classes = useStyles()
  const { avatar, login, nick, addresses, phones } = account
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <div className={classes.boxAvatar}>
        {avatar === null || avatar === undefined ? (
          <input
            onChange={onChangeAvatar}
            type="file"
            name="photo"
            id="photo"
          />
        ) : (
          <>
            <Avatar
              className={classes.boxAvatarImg}
              alt="UserIcon"
              src={`${ENDPOINT}/${account.avatar.url}`}
            />
            <input
              onChange={onChangeAvatar}
              type="file"
              name="photo"
              id="photo"
            />
          </>
        )}
      </div>
      <Box
        display="flex"
        flexDirection="column"
        p={1}
        bgcolor="background.paper"
      >
        <div className={classes.boxContent}>
          <Typography variant="h5" component={"span"}>
            логин: {login}
          </Typography>
        </div>
        <div className={classes.boxContent}>
          {nick === null ? (
            <TextField
              id="standard-basic"
              label="Введите свой ник"
              name="nick"
              onChange={onChange}
              type="text"
            />
          ) : (
            <div className={classes.boxContentChangeButton}>
              <p>ник: {nick}</p>
              <Button onClick={handleChangeNick}>изменить</Button>
            </div>
          )}
        </div>
        <div className={classes.boxContent}>
          {addresses === null ? (
            <TextField
              id="standard-basic"
              label="Введите свой адресс"
              name="addresses"
              onChange={onChange}
              type="text"
            />
          ) : (
            <div className={classes.boxContentChangeButton}>
              <p> адрес: {addresses}</p>
              <Button onClick={handleChangeAddresses}>изменить</Button>
            </div>
          )}
        </div>
        <div className={classes.boxContent}>
          {phones === null ? (
            <TextField
              id="standard-basic"
              label="Введите номер телефона"
              name="phones"
              onChange={onChange}
              type="tel"
            />
          ) : (
            <div className={classes.boxContentChangeButton}>
              <p>контакты: {phones}</p>
              <Button onClick={handleChangePhones}>изменить</Button>
            </div>
          )}
        </div>
        <div className={classes.boxContentButton}>
          {values !== null && (
            <Button type="submit" variant="contained" color="primary">
              Сохранить
            </Button>
          )}
        </div>
      </Box>
    </form>
  )
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  account: state.auth.account,
})
export default connect(mapStateToProps)(UserInfo)
