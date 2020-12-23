import React, { useState } from "react"
import { connect } from "react-redux"
import "./HomePage.css"
import Posts from "./Posts/index"
import { adDataFetched } from "../../store/adCreator/action"
import { CircularProgress } from "@material-ui/core"
import ReactPaginate from "react-paginate"
const PER_PAGE = 20
const HomePage = ({ adData, dataStatus, isLoggedIn, adDataFetched }) => {
  const [skipCount, setskipCount] = useState()
  React.useEffect(() => {
    if (isLoggedIn) {
      adDataFetched(skipCount)
    }
  }, [skipCount])

  const handleClick = (data) => {
    var { selected } = data
    var offset =
      adData.length === 0 ? selected * PER_PAGE : selected * adData.length
    setskipCount(offset)
  }
  return (
    <div className="container">
      <div className="main-container">
        {dataStatus === "resolved" ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {adData.map((item, index) => {
              return <Posts {...item} key={index} />
            })}
          </div>
        ) : null}
        {dataStatus === "resolved" && (
          <div id="react-paginate">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={8}
              pageRangeDisplayed={8}
              marginPagesDisplayed={10}
              onPageChange={handleClick}
              containerClassName={"pagination"}
              pageLinkClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        )}
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
export default connect(mapStateToProps, { adDataFetched })(HomePage)
