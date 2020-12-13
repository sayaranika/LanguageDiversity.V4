import React, { useState } from "react";
import Navbar from "./Navbar";
import Map from "./Map";
import ReactMapGL from "react-map-gl";
import * as Locations from "./locations";
import { FlyToInterpolator } from "react-map-gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import lData from "../data/lang_diversity.json";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { render } from "@testing-library/react";

var i = 0;
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

const data = lData;
const radius = 30;

const colorPalette = [
  [255, 237, 111],
  [227, 26, 28],
  [31, 120, 180],
  [51, 160, 44],
  [255, 127, 0],
  [106, 61, 154],
];

let assignedColors = [
  { label: "v_CA16_1916", value: 0 },
  { label: "v_CA16_2060", value: 1 },
];

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2F5YW5pa2EiLCJhIjoiY2toaHM2ajlkMDd1eDJ6cGgxM2dmdThzOSJ9.xlEQGt0fM1CT2ZS_N8iV-Q";

const DensityAlt = () => {
  const [viewState, setViewState] = useState(Locations.VancouverMetro);
  const handleChangeViewState = ({ viewState }) => setViewState(viewState);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [customLayers, setCustomLayers] = useState([]);
  const layers = [
    new ScatterplotLayer({
      id: "scatter-plot",
      data,
      radiusScale: radius,
      radiusMinPixels: 0.25,
      getPosition: (d) => [d[0], d[1]],
      getFillColor: (d) => get_colour(d[2]),
      getRadius: 1,
      updateTriggers: {
        getFillColor: assignedColors,
      },
    }),
  ];

  const handleFlyTo = (destination) =>
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });

  return (
    <div id="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 mapContainer">
            <Map
              width="100%"
              height="100%"
              viewState={viewState}
              onChangeViewState={handleChangeViewState}
              layers={customLayers}
            ></Map>
          </div>
          <div className="col-2">
            {Object.keys(Locations).map((key) => {
              return (
                <button key={key} onClick={() => handleFlyTo(Locations[key])}>
                  {key}
                </button>
              );
            })}
            <Select
              components={makeAnimated()}
              theme={customTheme}
              onChange={(values) => {
                setSelectedLanguage(values);
              }}
              options={languageIndex}
              className="mb-3"
              isMulti
              placeholder="Select language"
              autofocus
              isSearchable
            />
            <button onClick={showDensity}>show</button>
          </div>
        </div>
      </div>
    </div>
  );

  function get_colour(d) {
    var index = -1;
    index = assignedColors.findIndex((x) => x.label === d);

    if (index !== -1) {
      console.log(
        "d: " +
          d +
          "colorVal: " +
          assignedColors[index]["label"] +
          "colorIn:" +
          assignedColors[index]["value"] +
          "index: " +
          index
      );
      return colorPalette[assignedColors[index]["value"]];
    } else return [255, 255, 255, 0];
  }

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "yellow",
        primary: "orange",
      },
    };
  }
  //var i;
  var newElement = {};
  function showDensity() {
    //i = 0;
    if (i > 5) i = 0;
    assignedColors = [];
    selectedLanguage.forEach((lang) => {
      newElement = { label: lang.value, value: i };
      assignedColors.push(newElement);
      i++;
    });

    setCustomLayers([
      new ScatterplotLayer({
        id: "scatter-plot",
        data,
        radiusScale: radius,
        radiusMinPixels: 0.25,
        getPosition: (d) => [d[0], d[1]],
        getFillColor: (d) => get_colour(d[2]),
        getRadius: 1,
        updateTriggers: {
          getFillColor: assignedColors,
        },
      }),
    ]);
  }
};

export default DensityAlt;
