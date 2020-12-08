import React, { useState } from "react";
import ReactMapGL, { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2F5YW5pa2EiLCJhIjoiY2toaHM2ajlkMDd1eDJ6cGgxM2dmdThzOSJ9.xlEQGt0fM1CT2ZS_N8iV-Q";

export default function Map({
  width,
  height,
  viewState,
  onChangeViewState,
  layers,
}) {
  return (
    <StaticMap
      mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/sayanika/ckhxttbed165819qr1xoou0it"
      width={width}
      height={height}
      viewState={viewState}
      onChangeViewState={onChangeViewState}
    >
      <DeckGL viewState={viewState} layers={layers} />
    </StaticMap>
  );
}
