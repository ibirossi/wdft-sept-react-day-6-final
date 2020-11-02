import React from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerImage from 'leaflet/dist/images/marker-icon.png'

function myMap(){
    const position = [51.505, -0.09]
    return (
        <MapContainer style={{width: '900px', height: '500px'}} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker  position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
      </MapContainer>
    )
}


export default myMap