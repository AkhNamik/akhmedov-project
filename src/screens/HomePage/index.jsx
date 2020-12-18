import React from "react"
import { connect } from "react-redux"
import "./HomePage.css"
import Posts from "./Posts/index"
import { adDataFetched } from "../../store/adCreator/action"
import { CircularProgress } from "@material-ui/core"

const HomePage = ({ adData, dispatch, dataStatus }) => {
  React.useEffect(() => {
    dispatch(adDataFetched())
  }, [])

  return (
    <div className="container">
      <div className="main-container">
        {dataStatus === "resolved"
          ? adData.map((item) => {
              return <Posts {...item} />
            })
          : null}
        <div className="main-boxEror">
          {dataStatus === "pending" ? <CircularProgress /> : null}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authStatus: state.auth.status,
  adData: state.adCreator.data,
  dataStatus: state.adCreator.status,
})

export default connect(mapStateToProps)(HomePage)
