import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";


const Location = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <div className="px-8 h-96 w-full">
            <Map zoom={12} center={{ lat: 16.8508, lng: 96.1156 }}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>
                <AdvancedMarker position={{ lat: 16.8508, lng: 96.1156 }} >
                    <Pin background={"#ff6b35"} glyphColor={"white"}></Pin>
                </AdvancedMarker>
                <AdvancedMarker position={{ lat: 16.9042, lng: 96.0997 }} >
                    <Pin background={"#ff6b35"} glyphColor={"white"}></Pin>
                </AdvancedMarker>
            </Map>
        </div>
    </APIProvider>
  )
}

export default Location
