import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar/index"
import LoginForm from "./screens/LoginForm"
import HomePage from "./screens/HomePage"
import PostInfoWithRouter from "./screens/HomePage/PostInfo"
import UserInfo from "./screens/User"
import AdPost from "./screens/AdPost"
import { ACCOUNT, ADPOST, LOGIN_FORM, OBYAVLENIE } from "./types"
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path={LOGIN_FORM} component={LoginForm} />
            <Route exact path="/" component={HomePage} />
            <Route path={OBYAVLENIE} component={PostInfoWithRouter} />
            <Route path={ACCOUNT} component={UserInfo} />
            <Route path={ADPOST} component={AdPost} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}
export default App
