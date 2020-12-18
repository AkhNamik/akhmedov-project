import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar/index"
import LoginForm from "./screens/LoginForm"
import HomePage from "./screens/HomePage"
import PostInfoWithRouter from "./screens/HomePage/PostInfo"
import UserInfo from "./screens/User"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/loginform" component={LoginForm} />
            <Route exact path="/" component={HomePage} />
            <Route path="/obyavlenie/:postId" component={PostInfoWithRouter} />
            <Route path="/account/:id?" component={UserInfo} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
