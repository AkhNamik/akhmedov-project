import React from "react"
import { ENDPOINT } from "../../../API"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import icon from "../../../images/iconNotPhoto.png"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "27%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    margin: "10px",
    padding: "20px",
  },
  media: {
    height: 140,
    marginBottom: "20px",
  },
  mainCart: {
    flexGrow: 1,
  },
})

const Posts = ({ title, images, _id, price }) => {
  const classes = useStyles()
  const img = images
    ? images.map((item) => {
        if (item.url !== null) {
          return item.url
        }
      })
    : ""
  return (
    <Card className={classes.root}>
      <CardContent className={classes.mainCart}>
        <CardMedia
          className={classes.media}
          component="img"
          src={img[0] !== undefined ? ENDPOINT + "/" + img[0] : icon}
        />
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="p">
          {price !== null ? price + " " + "грн." : "нет цены"} 
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/obyavlenie/${_id}`}>
          <Button size="small" color="primary">
            Подробнее
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default Posts
