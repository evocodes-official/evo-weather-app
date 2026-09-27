import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Smooth flyTo controller on coordinate update
function MapCenter({ lat, lon, zoom = 4 }) {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lon != null) {
      map.flyTo([lat, lon], zoom, {
        duration: 1.2,
      });
    }
  }, [lat, lon, zoom, map]);

  return null;
}

// Map click listener to select any location worldwide
function MapClick({ onLocationSelect }) {
  useMapEvents({
    click(event) {
      if (onLocationSelect) {
        onLocationSelect({
          lat: event.latlng.lat,
          lon: event.latlng.lng,
        });
      }
    },
  });

  return null;
}

/**
 * MapGestureControls:
 * - Enables smooth two-finger touch zoom (pinch in / pinch out).
 * - Intercepts trackpad pinch gestures (wheel with ctrlKey) to smoothly zoom the map.
 * - Leaves the screen completely clean without any popup banners or overlays.
 */
function MapGestureControls() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    // Enable native Leaflet touch & wheel zoom handlers
    if (map.touchZoom) map.touchZoom.enable();
    if (map.dragging) map.dragging.enable();
    if (map.scrollWheelZoom) map.scrollWheelZoom.enable();
    if (map.doubleClickZoom) map.doubleClickZoom.enable();
    const container = map.getContainer();
    // Smooth trackpad pinch-to-zoom support (prevents browser-level page zoom)
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          map.zoomIn(0.4);
        } else if (e.deltaY > 0) {
          map.zoomOut(0.4);
        }
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [map]);

  return null;
}
// On-map Zoom In / Zoom Out buttons
function MapZoomButtons() {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1.5 shadow-xl">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          map.zoomIn();
        }}
        title="Zoom In"
        className="w-9 h-9 rounded-xl bg-black/75 hover:bg-black/90 backdrop-blur-xl border border-white/20 text-white font-bold text-lg flex items-center justify-center transition cursor-pointer active:scale-95 shadow-md"
      >
        +
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          map.zoomOut();
        }}
        title="Zoom Out"
        className="w-9 h-9 rounded-xl bg-black/75 hover:bg-black/90 backdrop-blur-xl border border-white/20 text-white font-bold text-lg flex items-center justify-center transition cursor-pointer active:scale-95 shadow-md"
      >
        −
      </button>
    </div>
  );
}

function WeatherMap({ lat, lon, city, onLocationSelect }) {
  const [mapStyle, setMapStyle] = useState("osm");
  // Custom bullseye target marker with floating white city badge
  const customTargetIcon = useMemo(() => {
    const cityName = city || "Selected Location";
    return L.divIcon({
      className: "custom-weather-target-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: none;">
          <!-- Floating White City Badge -->
          <div style="background: white; color: #0f172a; font-family: system-ui, -apple-system, sans-serif; font-weight: 600; font-size: 13px; padding: 6px 14px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.28); white-space: nowrap; margin-bottom: 7px; border: 1px solid rgba(0,0,0,0.06); text-align: center;">
            ${cityName}
          </div>
          <!-- Orange Target / Bullseye icon -->
          <div style="width: 30px; height: 30px; border-radius: 50%; background: #ea580c; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(234,88,12,0.65); border: 2.5px solid white;">
            <div style="width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid white; background: #ea580c; display: flex; align-items: center; justify-content: center;">
              <div style="width: 4px; height: 4px; border-radius: 50%; background: white;"></div>
            </div>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }, [city]);
  if (lat == null || lon == null) {
    return null;
  }
  const MAP_STYLES = [
    { id: "osm", label: "🗺️ Street Map" },
    { id: "topo", label: "🏔️ Topo Terrain" },
    { id: "satellite", label: "🛰️ Satellite" },
  ];
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-1">
        <div>
          <h2 className="text-sm sm:text-base uppercase tracking-widest text-white/50 font-bold">
            Interactive Weather Map
          </h2>
          <p className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Explore {city} & Surrounding Region
          </p>
        </div>
        {/* Clean Map Style Switcher (100% Free, NO API Key Required) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 self-start sm:self-auto">
          {MAP_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => setMapStyle(style.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                mapStyle === style.id
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/15 glass-panel shadow-2xl z-0">
        <MapContainer
          center={[lat, lon]}
          zoom={6}
          touchZoom={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          zoomControl={false}
          className="h-[440px] sm:h-[480px] w-full z-0"
        >
          {/* Base Layer 1: OpenStreetMap (Standard worldwide map, 100% free, NO watermark, NO API key required) */}
          {mapStyle === "osm" && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          )}
          {/* Base Layer 2: Esri World Topo Map (Soft pastel topography, 100% free, NO watermark, NO API key required) */}
          {mapStyle === "topo" && (
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, USGS'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          )}
          {/* Base Layer 3: Esri Satellite World Imagery (100% free, NO watermark, NO API key required) */}
          {mapStyle === "satellite" && (
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
            />
          )}
          <MapCenter lat={lat} lon={lon} zoom={6} />
          {/* Target marker with city pill */}
          <Marker position={[lat, lon]} icon={customTargetIcon} />
          <MapClick onLocationSelect={onLocationSelect} />
          {/* Multi-touch finger zoom & trackpad zoom controller */}
          <MapGestureControls />
          {/* On-map zoom buttons */}
          <MapZoomButtons />
        </MapContainer>
      </div>
    </section>
  );
}

export default WeatherMap;