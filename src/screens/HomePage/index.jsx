import React from "react"
import { connect } from "react-redux"
import "./HomePage.css"
import Posts from "./Posts/index"
import { adDataFetched } from "../../store/adCreator/action"
import { CircularProgress } from "@material-ui/core"
import ReactPaginate from 'react-paginate';


const HomePage = ({ adData, dispatch, dataStatus, isLoggedIn }) => {
  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(adDataFetched())
    }
  }, [])
  const [paginate, setPaginate] = React.useState({
    initialPage: 1,
    itemsCountPerPage: 100,
    pageCount: 1000,
    pageRangeDisplayed: 5,
    marginPagesDisplayed: 5
  })
  const handlePagination = (activePage) => {
    const skip = paginate.itemsCountPerPage * paginate.activePage
    fetch(
      `https://google.com?limit=${paginate.itemsCountPerPage}&skip=${skip}`
    ).then((res) => {
      //получим новые посты и диспатчить state
      setPaginate({
        ...paginate,
        activePage,
      })
    })
  }
  return (
    <div className="container">
      <div className="main-container">
        {dataStatus === "resolved" ? (
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {adData.map((item, index) => {
              return <Posts {...item} key={index} />
            })}
            <ReactPaginate
              pageCount={10}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        ) : null}
        <div className="main-boxEror">
          {dataStatus === "pending" ? <CircularProgress /> : null}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  adData: state.adCreator.data,
  dataStatus: state.adCreator.status,
})

export default connect(mapStateToProps)(HomePage)
