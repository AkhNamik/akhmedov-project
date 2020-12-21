import { Button } from "@material-ui/core"
import React from "react"
import { ENDPOINT } from "../../API"
import "./AdPost.css"

const AdPost = () => {
  const [values, setValues] = React.useState({})
  const onSubmit = (e) => {
    e.preventDefault()
  }
  const onChange = (e) => {
    const target = e.target
    setValues((prev) => ({
      ...prev,
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
        setValues({
          avatar: {
            _id: res._id,
          },
        })                                    
      })
  }
  return (
    <form onSubmit={onSubmit} className="main-form">
      <div className="form-detail">
        <h3>Название:</h3>
        <input onChange={onChange} type="text" name="title" />
        <br />
        <h3>Описаниe:</h3>
        <textarea
          onChange={onChange}
          type="text"
          rows="5"
          cols="50"
          name="description"
        />
      </div>
      <div className="form-price">
        <h3>Цена:</h3>
        <input type="number" name="price" onChange={onChange} />
      </div>
      <div className="form-photo">
        <h3>Загрузить фото:</h3>
        <input onChange={onChangeAvatar} type="file" name="photo" id="photo" />
        <input onChange={onChangeAvatar} type="file" name="photo" id="photo" />
        <input onChange={onChangeAvatar} type="file" name="photo" id="photo" />
      </div>
      <div className="form-location">
        <h3>Адрес:</h3>
        <input type="text" name="adrress" onChange={onChange} />
      </div>
      <div className="form-button">
        <Button variant="outlined">Добавить пост</Button>
      </div>
    </form>
  )
}

export default AdPost
