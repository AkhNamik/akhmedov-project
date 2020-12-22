import React from "react"
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router-dom"
import { ENDPOINT } from "../../../API"
import "./PostInfo.css"
import icon from "../../../images/iconNotPhoto.png"
import { Avatar } from "@material-ui/core"
import SliderImage from "../../../components/Slider"

const PostInfo = ({ data, match }) => {
  if (data.length === 0) {
    return <Redirect to="/" />
  }
  const filterData = data.filter((item) => {
    return item._id === match.params.postId
  })
  const { description, owner, images, title, price } = filterData[0]
  const { avatar } = owner
  return (
    <div className="post-container">
      {images !== null ? (
        <SliderImage images={images} />
      ) : (
        <div className="post-img">
          <img src={icon} />
        </div>
      )}
      <div className="post-content">
        <h2>{title}</h2>
        <p>{price !== null ? price + " " + "грн." : "нет цены"}</p>
        <h3>Описание</h3>
        <p>{description}</p>
        <h3>Контакты</h3>
        <div className="post-phones">
          <div className="post-contact">
            {avatar.url !== null && avatar.url !== undefined && (
              <Avatar alt="UserIcon" src={`${ENDPOINT}/${avatar.url}`} />
            )}
            <p>{owner.nick || "Без имени"}</p>
          </div>
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
