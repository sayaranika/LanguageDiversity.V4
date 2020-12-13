import React from "react";
import "../App.css";
import * as d3 from "d3";
import MapTreeCombined from "./MapTreeCombined";

let combined;
Promise.all([
  fetch("./data/Vancouver_LDI.geojson"),
  fetch("./data/Vancouver_LDI_agg.geojson"),
  fetch("./data/lang_fam.json"),
]).then(async (files) => {
  combined = new MapTreeCombined(
    {
      mapParentElement: "#choropleth",
      treeParentElement: "#tree",

      mapWidth: window.outerWidth,
      mapHeight: window.outerHeight - 56,
    },
    files[0],
    files[1],
    files[2]
  );
  // combined.update();
});

function Diversity() {
  return (
    <div id="app">
      <div className="container-fluid">
        <h1>Choropleth map will go here</h1>
        <svg id="choropleth"></svg>
      </div>
    </div>
  );
}

export default Diversity;
