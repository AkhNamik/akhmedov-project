import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { ENDPOINT } from "../../API"
import "./AdPost.css"
import { fetchPost } from "./adPostFetch"

const AdPost = ({ dispatch }) => {
  const [values, setValues] = React.useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
      dispatch(fetchPost(values))
  }
  const handleFile = (e) => {
    Promise.allSettled(
      [...e.target.files].map((file) => {
        const formData = new FormData()
        formData.append("photo", file)
        return fetch(`${ENDPOINT}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: formData,
        }).then((res) => res.json())
      })
    ).then((res) => {
      const images = res.reduce((acc, item) => {
        if (item.status === "fulfilled")
          return [
            ...acc,
            {
              _id: item.value._id,
            },
          ]
        return acc
      }, [])
      setValues({
        ...values,
        images,
      })
    })
  }
  const handleChange = (e) => {
    const target = e.target
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }
  const handleChangePrice = (e) => {
    const target = e.target
    setValues((prev) => ({
      ...prev,
      [target.name]: +target.value,
    }))
  }
  return (
    <form onSubmit={handleSubmit} className="main-form">
      <div className="form-detail">
        <h3>Название:</h3>
        <input onChange={handleChange} type="text" name="title" />
        <br />
        <h3>Описаниe:</h3>
        <textarea
          onChange={handleChange}
          type="text"
          rows="5"
          cols="50"
          name="description"
        />
      </div>
      <div className="form-price">
        <h3>Цена:</h3>
        <input type="number" name="price" onChange={handleChangePrice} />
      </div>
      <div className="form-photo">
        <h3>Загрузить фото:</h3>
        <input
          onChange={handleFile}
          type="file"
          name="photo"
          id="photo"
          multiple
        />
      </div>
      <div className="form-location">
        <h3>Адрес:</h3>
        <input type="text" name="address" onChange={handleChange} />
      </div>
      <div className="form-button">
        <Button variant="outlined" type="submit">
          Добавить пост
        </Button>
      </div>
    </form>
  )
}

export default connect(null)(AdPost)
