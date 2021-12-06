import { useState } from "react";
import "leaflet/dist/leaflet.css";
import RenderMarkers from "./RenderMarkers";
import styles from "../../styles/Map.module.scss";
import { MapContainer, TileLayer } from "react-leaflet";

const MapComponent = ({ coords, drag, zoom, setMap, restaurants, zoomLvl }) => {
  const mapOptions = {
    center: coords || [46.77093, 23.58999],
    zoom: zoomLvl || 16,
    minZoom: 3,
    bounds: [
      [85, -180],
      [-85, 180],
    ],
    worldCopyJump: true,
    dragging: drag,
    zoomControl: zoom,
    scrollWheelZoom: zoom,
  };

  return (
    <MapContainer {...mapOptions} whenCreated={setMap}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=5gmZuuLzlI9UZok0Vc6h"
      />
      {(coords || restaurants.length) && (
        <RenderMarkers coords={coords} restaurants={restaurants} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
