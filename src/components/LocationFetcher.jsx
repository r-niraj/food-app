import React, { useEffect, useState, useCallback } from "react";
import { useApp } from "../context/AppContext";

/**
 * This component is not a screen; it's used internally in pages where needed.
 * It auto-prompts for location on mount and saves to context/localStorage.
 */
export default function LocationFetcher() {
  const { location, setLocation } = useApp();
  const [status, setStatus] = useState(
    location?.address || (location?.latitude ? "Location loaded" : "Detecting location...")
  );

  // Function to encapsulate the geolocation request logic
  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    // Set status to loading before making the request
    setStatus("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      // Success Callback
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setStatus("Fetching address...");
        setLocation({ latitude: lat, longitude: lon, address: null });

        try {
          // Reverse geocoding using Nominatim (OpenStreetMap)
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await res.json();
          const addr = data.display_name || null;
          setLocation({ latitude: lat, longitude: lon, address: addr });
          setStatus(addr || "Address not found");
        } catch (err) {
          setLocation({ latitude: lat, longitude: lon, address: null });
          setStatus("Unable to fetch address");
        }
      },
      // Error Callback
      (err) => {
        // Set the status that triggers the retry button display
        setStatus("Please allow location");
        console.error("Geolocation failed:", err);
      },
      // Options
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [setLocation]); // Depend on setLocation from context

  // Initial request on component mount
  useEffect(() => {
    // Only fetch if location hasn't already been set
    if (location && location.latitude) return; 
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchLocation]); // Depend on fetchLocation

  const showRetryButton = status === "Please allow location";
  const showMapsLink = location && location.latitude;

  // The Google Maps URL from your previous code is slightly malformed. 
  // A corrected format for Google Maps is:
  const mapsUrl = `https://maps.google.com/maps?q=${location?.latitude},${location?.longitude}`;

  return (
    <div style={{ padding: 10, borderBottom: "1px solid #eee", background: "#fff" }}>
      <div style={{ fontWeight: 700 }}>Delivery location</div>
      <div className="muted" style={{ marginBottom: (showRetryButton || showMapsLink) ? '10px' : '0' }}>
        {status}
      </div>

      {/* Button to retry location fetching */}
      {showRetryButton && (
        <>
          <p style={{ fontSize: '12px', color: '#999', margin: '0 0 8px 0' }}>
            Location access denied. Please manually enable it in your browser settings if you wish to retry.
          </p>
          <button
            onClick={fetchLocation} // Call the fetch function again
            style={{
              padding: '8px 15px',
              backgroundColor: 'var(--primary, #ff6b00)', 
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              marginBottom: '10px'
            }}
          >
            Retry Location Detection
          </button>
        </>
      )}

      {/* Link to Google Maps (Only shown on successful location load) */}
      {showMapsLink && (
        <div style={{ marginTop: 8 }}>
          <a
            className="map-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary, #ff6b00)", textDecoration: "underline" }}
          >
            📍 Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}