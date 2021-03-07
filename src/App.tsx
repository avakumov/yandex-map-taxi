import React from "react";
import { YMaps } from "react-yandex-maps";
import Home from "./pages/Home";

function App() {
  return (
    <YMaps query={{lang:"ru_RU", apikey:"6866d6c5-0459-42ba-9faf-d7aa5e46a863", load: "package.full" }}>
      <div className="container mx-auto px-4 font-sans text-sm">
        <Home />
      </div>
    </YMaps>
  );
}

export default App;
