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

const colorPalette = [
    [255, 237, 111],
    [227, 26, 28],
    [31, 120, 180],
];

let assignedColors = [
    { label: "v_CA16_1916", value: 0 },
    { label: "v_CA16_2060", value: 1 },
];

const REACT_APP_MAPBOX_TOKEN =
    "pk.eyJ1Ijoic2F5YW5pa2EiLCJhIjoiY2toaHM2ajlkMDd1eDJ6cGgxM2dmdThzOSJ9.xlEQGt0fM1CT2ZS_N8iV-Q";

const INITIAL_VIEW_STATE = {
    longitude: -123.07797,
    latitude: 49.3,
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
    const [selectColors, setSelectColor] = useState(assignedColors);

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
                //getFillColor: assignedColors
            },
        }),
    ];
    const [myLayers, setMyLayers] = useState(layers);

    return (
        <div id="app">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mapContainer">
                        <DeckGL
                            layers={myLayers}
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

    var i;
    var newElement = {};

    function showDensity() {
        i = 0;
        assignedColors = [];
        selectedLanguage.forEach((lang) => {
            newElement = { label: lang.value, value: i };
            assignedColors.push(newElement);
            i++;
        });
        setSelectColor(assignedColors);

        setMyLayers([
            new ScatterplotLayer({
                id: "scatter-plot",
                data,
                radiusScale: radius,
                radiusMinPixels: 0.25,
                getPosition: (d) => [d[0], d[1]],
                getFillColor: (d) => get_colour(d[2]),
                getRadius: 1,
                updateTriggers: {
                    //getFillColor: assignedColors
                },
            }),
        ]);
    }

    function get_colour(d) {
        var index = -1;
        index = selectColors.findIndex((x) => x.label === d);

        if (index !== -1) {
            console.log(
                "d: " +
                d +
                "colorVal: " +
                selectColors[index]["label"] +
                "colorIn:" +
                selectColors[index]["value"] +
                "index: " +
                index
            );
            return colorPalette[selectColors[index]["value"]];
        } else return [255, 255, 255, 0];
    }
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

export default Density;
