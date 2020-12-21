import React from "react"
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router-dom"
import { ENDPOINT } from "../../../API"
import "./PostInfo.css"
import icon from "../../../images/iconNotPhoto.png"

const PostInfo = ({ data, match }) => {
  if (data.length === 0) {
    return <Redirect to="/" />
  }
  const filterData = data.filter((item) => {
    return item._id === match.params.postId
  })
  const { description, owner, images, title, price } = filterData[0]
  var urlImg = null
  if (images !== null) {
    urlImg = images.map((item) => {
      return item.url
    })
  }
  return (
    <div className="post-container">
      <div className="post-img">
        {urlImg !== null
          ? urlImg.map((item, index) => {
              return (
                item !== null && <img src={`${ENDPOINT}/${item}`} key={index} />
              )
            })
          : null}
        {images === null && <img src={icon} />}
      </div>
      <div className="post-content">
        <h2>{title}</h2>
        <p>{price !== null ? price + " " + "грн." : "нет цены"}</p>
        <h3>Описание</h3>
        <p>{description}</p>
        <h3>Контакты</h3>
        <div className="post-phones">
          <p>{owner.nick || "Без имени"}</p>
          {owner.phones !== null ? (
            owner.phones.map((item, index) => {
              return (
                <a href="#" key={index}>
                  {" "}
                  {item}
                </a>
              )
            })
          ) : (
            <p>нет контактов</p>
          )}
        </div>
      </div>
    </div>
  )
}

let PostInfoWithRouter = withRouter(PostInfo)

const mapStateToProps = (state) => ({
  data: state.adCreator.data,
})

export default connect(mapStateToProps)(PostInfoWithRouter)
