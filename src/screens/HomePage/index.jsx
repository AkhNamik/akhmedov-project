import React from "react"
import { connect } from "react-redux"
import "./HomePage.css"
import Posts from "./Posts/index"
import { adDataFetched } from "../../store/adCreator/action"
import { CircularProgress } from "@material-ui/core"

const HomePage = ({ adData, dispatch, dataStatus, isLoggedIn }) => {
  React.useEffect(() => {
    if(isLoggedIn){
      dispatch(adDataFetched())
    }
  }, [])

  return (
    <div className="container">
      <div className="main-container">
        {dataStatus === "resolved"
          ? adData.map((item, index) => {
              return <Posts {...item} key={index} />
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
  isLoggedIn: state.auth.isLoggedIn,
  authStatus: state.auth.status,
  adData: state.adCreator.data,
  dataStatus: state.adCreator.status,
})

export default connect(mapStateToProps)(HomePage)
