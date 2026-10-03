import React, { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Set API key
        setOptions({
          apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        // Import required libraries
        const { Map } = await importLibrary('maps');
        const { Marker } = await importLibrary('marker');
        
        // Restaurant location - NIT Srinagar, Jammu and Kashmir
        const restaurantLocation = { lat: 34.0837, lng: 74.7973 }; // NIT Srinagar coordinates
        
        const map = new Map(mapRef.current, {
          center: restaurantLocation,
          zoom: 15,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Add restaurant marker
        const marker = new Marker({
          position: restaurantLocation,
          map: map,
          title: 'Tibetan Restaurant'
        });

        // Add info window
        const { InfoWindow } = await importLibrary('maps');
        const infoWindow = new InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0; color: #dc2626;">Tibetan Restaurant</h3>
              <p style="margin: 0; font-size: 14px;">Near NIT Srinagar, Hazratbal</p>
              <p style="margin: 0; font-size: 14px;">Srinagar, Jammu and Kashmir 190006</p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">+91 98765 43210</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

      } catch (error) {
        console.error('Error loading Google Maps:', error);
        // Fallback content if Google Maps fails to load
        mapRef.current.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; border-radius: 10px;">
            <div style="text-align: center; color: #666;">
              <span style="font-size: 2rem; margin-bottom: 0.5rem;">📍</span>
              <p>Tibetan Restaurant</p>
              <p>123 Main Street, Anytown, USA 12345</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        `;
      }
    };

    initMap();
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '300px', 
        borderRadius: '10px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default GoogleMap;
