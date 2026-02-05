"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = typeof window !== "undefined" ? L.divIcon({
  html: `<div style="background-color: #7C3AED; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
}) : null;

export default function MapProvider({ properties }: { properties: any[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-full w-full bg-gray-100 rounded-[24px]" />;
  }

  const centerPosition: [number, number] = properties?.[0]?.location 
    ? [properties[0].location.lat, properties[0].location.lng] 
    : [-6.2088, 106.8456];

  return (
    <div className="h-full w-full relative" style={{ isolation: "isolate" }}>
      <MapContainer
        key={centerPosition.join(",")}
        center={centerPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", borderRadius: "24px" }}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />

        {properties?.map((p) => (
          p.location?.lat && p.location?.lng && (
            <Marker 
              key={p.id} 
              position={[p.location.lat, p.location.lng]} 
              icon={customIcon as L.DivIcon}
            >
              <Popup>
                <div className="font-syne">
                  <p className="font-bold text-sm">{p.title}</p>
                  <p className="text-[#7C3AED] text-xs font-semibold">
                    ${p.price.toLocaleString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}