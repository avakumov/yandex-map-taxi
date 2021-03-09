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
        apikey: "6866d6c5-0459-42ba-9faf-d7aa5e46a863",
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
