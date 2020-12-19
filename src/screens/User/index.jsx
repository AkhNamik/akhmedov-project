import React from "react"
import { connect } from "react-redux"
import {fetchUser} from "./fetchUser"
import jwt_decode from "jwt-decode";

const UserInfo = ({isLoggedIn, dispatch, account}) => {
    React.useEffect(() => {
        if(isLoggedIn){
            const decode = jwt_decode(localStorage.getItem("authToken"))
            const id = decode.sub.id
           dispatch(fetchUser(id))
        }
    }, [])
    return (
        <div>
            <p>{account._id}</p>  
            <p>{account.login}</p>
            <p></p>
        </div>
    )

}
const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    account: state.auth.account
  })
export default connect(mapStateToProps)(UserInfo)