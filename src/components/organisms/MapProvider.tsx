"use client";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Property } from "../../types/properties";

// Card dimensions — dipakai untuk kalkulasi posisi agar tidak keluar viewport
const CARD_WIDTH  = 300;
const CARD_HEIGHT = 330; // estimasi tinggi card
const CARD_OFFSET = 16;  // jarak antara ujung card dan marker

// ─── Icon Factories ───────────────────────────────────────────────────────────

const createPillIcon = (price: number, priceType: string, isActive: boolean) => {
  const label =
    priceType === "month"
      ? `$${price.toLocaleString()}`
      : `$${(price / 1000).toFixed(0)}k`;

  const bg     = isActive ? "#7C3AED" : "#FFFFFF";
  const color  = isActive ? "#FFFFFF" : "#101828";
  const shadow = isActive
    ? "0 4px 16px rgba(124,58,237,0.35)"
    : "0 2px 8px rgba(0,0,0,0.15)";

  const tail = isActive
    ? `<span style="
        position:absolute;bottom:-5px;left:50%;
        transform:translateX(-50%) rotate(45deg);
        width:10px;height:10px;
        background:#7C3AED;
        border-radius:1px;
        box-shadow:2px 2px 4px rgba(124,58,237,0.25);
        z-index:-1;
      "></span>`
    : "";

  return L.divIcon({
    html: `
      <div style="
        position:relative;
        display:flex;align-items:center;gap:6px;
        background:${bg};color:${color};
        padding:6px 10px;border-radius:100px;
        font-family:'Hanken Grotesk',sans-serif;font-size:13px;font-weight:600;
        box-shadow:${shadow};
        border:${isActive ? "none" : "1.5px solid #E5E7EB"};
        white-space:nowrap;cursor:pointer;
        transition:all .2s ease;
      ">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${isActive ? "#E9D5FF" : "#7C3AED"}" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"/>
        </svg>
        ${label}
        ${tail}
      </div>
    `,
    className: "",
    iconSize: [80, 40],
    iconAnchor: [40, 21],
  });
};

// ─── Click-outside helper ─────────────────────────────────────────────────────

function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({ click: onMapClick });
  return null;
}

// ─── SmartMarker — akses map instance untuk konversi lat/lng → pixel ─────────

interface SmartMarkerProps {
  property: Property;
  isActive: boolean;
  onActivate: (id: string, px: number, py: number) => void;
  onDeactivate: () => void;
}

function SmartMarker({ property, isActive, onActivate, onDeactivate }: SmartMarkerProps) {
  const map = useMapEvents({});

  const handleClick = (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e);

    if (isActive) {
      onDeactivate();
      return;
    }

    // Konversi koordinat lat/lng → pixel relatif terhadap map container
    const point = map.latLngToContainerPoint([
      property.location.lat,
      property.location.lng,
    ]);

    onActivate(property.id, point.x, point.y);
  };

  return (
    <Marker
      position={[property.location.lat, property.location.lng]}
      icon={createPillIcon(property.price, property.priceType, isActive)}
      eventHandlers={{ click: handleClick }}
    />
  );
}

// ─── Smart position calculator ────────────────────────────────────────────────

/**
 * Hitung posisi card (top, left) dalam px relatif terhadap map container.
 * Logic seperti AI targeting di RPG:
 *   1. Cek apakah ada ruang di atas marker → taruh di atas
 *   2. Kalau tidak → taruh di bawah
 *   3. Horizontal: center terhadap marker lalu clamp agar tidak keluar tepi
 */
function calcCardPosition(
  markerPx: { x: number; y: number },
  containerW: number,
  containerH: number
): { top: number; left: number } {
  const pillHeight = 40;

  const spaceAbove = markerPx.y;
  const spaceBelow = containerH - markerPx.y;
  const placeAbove = spaceAbove >= CARD_HEIGHT + CARD_OFFSET;
  const placeBelow = spaceBelow >= CARD_HEIGHT + CARD_OFFSET;

  let top: number;
  if (placeAbove) {
    top = markerPx.y - pillHeight / 2 - CARD_HEIGHT - CARD_OFFSET;
  } else if (placeBelow) {
    top = markerPx.y + pillHeight / 2 + CARD_OFFSET;
  } else {
    // Fallback: vertically center dekat marker
    top = markerPx.y - CARD_HEIGHT / 2;
  }

  // Horizontal: center terhadap marker
  let left = markerPx.x - CARD_WIDTH / 2;

  // Clamp agar tidak keluar container (padding 8px di setiap sisi)
  const pad = 8;
  left = Math.max(pad, Math.min(left, containerW - CARD_WIDTH - pad));
  top  = Math.max(pad, Math.min(top,  containerH - CARD_HEIGHT - pad));

  return { top, left };
}

// ─── Popup Card ───────────────────────────────────────────────────────────────

function PropertyPopupCard({
  property,
  position,
  onClose,
}: {
  property: Property;
  position: { top: number; left: number };
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top:  position.top,
        left: position.left,
        zIndex: 1000,
        width: `${CARD_WIDTH}px`,
        background: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
        fontFamily: "'Hanken Grotesk', sans-serif",
        animation: "popupIn .2s ease",
        pointerEvents: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>

      {/* Foto */}
      <div style={{ position: "relative", height: "160px" }}>
        <img
          src={property.image}
          alt={property.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "10px", right: "10px",
            width: "28px", height: "28px", borderRadius: "50%",
            background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            fontSize: "14px", color: "#374151", lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
          <span style={{ fontWeight: 700, fontSize: "16px", color: "#101828" }}>
            ${property.price.toLocaleString()}
          </span>
          {property.priceType === "month" && (
            <span style={{ color: "#6B7280", fontWeight: 400 }}>/month</span>
          )}
        </p>

        <p style={{
          margin: "4px 0 2px", fontWeight: 700, fontSize: "15px",
          color: "#101828", lineHeight: 1.3,
          overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        }}>
          {property.title}
        </p>

        <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#6B7280" }}>
          {property.city}, {property.state}
        </p>

        <div style={{
          display: "flex", gap: "16px",
          borderTop: "1px solid #F3F4F6", paddingTop: "10px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9V19M22 9V19M2 14H22M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9M6 7V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V7"/>
            </svg>
            <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>
              {property.bedrooms} Beds
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12H20M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M20 12V8C20 6.89543 19.1046 6 18 6H6C4.89543 6 5 7 5 8"/>
            </svg>
            <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>
              {property.bathrooms} Baths
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 3L14 10M3 21L10 14M21 3H15M21 3V9M3 21H9M3 21V15"/>
            </svg>
            <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>
              {property.squareArea} m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MapProvider({ properties }: { properties: Property[] }) {
  const [isClient, setIsClient] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [markerPx, setMarkerPx] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) {
    return <div className="h-full w-full bg-gray-100 rounded-[24px]" />;
  }

  const centerPosition: [number, number] = properties?.[0]?.location
    ? [properties[0].location.lat, properties[0].location.lng]
    : [-6.2088, 106.8456];

  const activeProperty = properties.find((p) => p.id === activeId) ?? null;

  const cardPosition = (() => {
    if (!markerPx || !containerRef.current) return { top: 16, left: 16 };
    const { offsetWidth: w, offsetHeight: h } = containerRef.current;
    return calcCardPosition(markerPx, w, h);
  })();

  const handleActivate = (id: string, px: number, py: number) => {
    setMarkerPx({ x: px, y: py });
    setActiveId(id);
  };

  const handleDeactivate = () => {
    setActiveId(null);
    setMarkerPx(null);
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative"
      style={{ isolation: "isolate" }}
    >
      {/* Popup card — posisi dinamis berdasarkan kuadran marker dalam container */}
      {activeProperty && markerPx && (
        <PropertyPopupCard
          property={activeProperty}
          position={cardPosition}
          onClose={handleDeactivate}
        />
      )}

      <MapContainer
        key={centerPosition.join(",")}
        center={centerPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "24px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={handleDeactivate} />

        {properties?.map(
          (p) =>
            p.location?.lat && p.location?.lng && (
              <SmartMarker
                key={p.id}
                property={p}
                isActive={p.id === activeId}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
              />
            )
        )}
      </MapContainer>
    </div>
  );
}