import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import LoginForm from "./screens/LoginForm"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/loginform" component={LoginForm} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
