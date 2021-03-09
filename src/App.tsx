import React from "react"
import { YMaps } from "react-yandex-maps"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import Order from "./pages/Order"

function App() {
  return (
    <YMaps
      query={{
        lang: "ru_RU",
        apikey: process.env.REACT_APP_YANDEX_API_KEY,
        load: "package.full",
      }}
    >
      <div className="container mx-auto px-4 font-sans text-sm text-gray-600 font-thin">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/order" component={Order} />
          </Switch>
        </Router>
      </div>
    </YMaps>
  )
}

export default App
