import React, { useState } from "react";
import Navbar from "./Navbar";
import { render } from "react-dom";
import ReactMapGL, { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import lData from "../data/lang_diversity.json";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const languageIndex = [
  { label: "English", value: "v_CA16_1364" },
  { label: "French", value: "v_CA16_1367" },
  { label: "Cantonese", value: "v_CA16_2060" },
  { label: "Mandarin", value: "v_CA16_2066" },
  { label: "Punjabi", value: "v_CA16_1916" },
  { label: "German", value: "v_CA16_1847" },
  { label: "Tagalog", value: "v_CA16_1727" },
  { label: "Korean", value: "v_CA16_1973" },
  { label: "Spanish", value: "v_CA16_1958" },
  { label: "Farsi", value: "v_CA16_1937" },
];

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2F5YW5pa2EiLCJhIjoiY2toaHM2ajlkMDd1eDJ6cGgxM2dmdThzOSJ9.xlEQGt0fM1CT2ZS_N8iV-Q";

const INITIAL_VIEW_STATE = {
  longitude: -123.07797,
  latitude: 49.3,
  //longitude: -123.07797,
  //latitude: 49.314084,
  zoom: 10,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

function Density({
  data = lData,
  radius = 30,
  mapStyle = "mapbox://styles/sayanika/ckhxttbed165819qr1xoou0it",
}) {
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const layers = [
    new ScatterplotLayer({
      id: "scatter-plot",
      data,
      radiusScale: radius,
      radiusMinPixels: 0.25,
      getPosition: (d) => [d[0], d[1]],
      getFillColor: (d) => get_colour(d[2]),
      getRadius: 1,
      updateTriggers: {},
    }),
  ];

  return (
    <div id="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 mapContainer">
            <DeckGL
              layers={layers}
              initialViewState={INITIAL_VIEW_STATE}
              controller={true}
            >
              <StaticMap
                reuseMaps
                mapStyle={mapStyle}
                mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                preventStyleDiffing={true}
              />
            </DeckGL>
          </div>
          <div className="col-2">
            <Select
              components={makeAnimated()}
              theme={customTheme}
              onChange={setSelectedLanguage}
              options={languageIndex}
              className="mb-3"
              isMulti
              placeholder="Select language"
              autofocus
              isSearchable
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function get_colour(d) {
  //console.log(d);
  return [255, 237, 111];
  /* if (d === selections[0]) return [255, 237, 111];
  else if (d === selections[1]) return [227, 26, 28];
  else if (d === selections[2]) [31, 120, 180];
  else return [0, 128, 255, 0]; */
}

function customTheme(theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "orange",
      primary: "orange",
    },
  };
}

export default Density;
