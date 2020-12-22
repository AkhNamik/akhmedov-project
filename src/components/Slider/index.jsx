import React from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { ENDPOINT } from "../../API"
import "./Slider.css"

const SliderImage = ({ images }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  console.log(images, "images")
  return (
    <div className="post-slider">
      <Slider {...settings}>
        {images.map((item, index) => {
          if (item.url !== null) {
            return (
              <div key={index}>
                <img src={`${ENDPOINT}/${item.url}`} alt="photo" />
              </div>
            )
          }
        })}
      </Slider>
    </div>
  )
}

export default SliderImage
