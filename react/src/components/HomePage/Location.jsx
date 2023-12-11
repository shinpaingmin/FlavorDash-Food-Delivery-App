import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { locations } from "../../constants/mapData";


const Location = () => {

    const [open, setOpen] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <div className="px-8 h-96 w-full">
            <Map zoom={12} center={{ lat: 16.8508, lng: 96.1156 }}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>

                {
                    locations.map((loc) => (
                        <div key={loc.id}>
                        <AdvancedMarker
                                position={{ lat: loc.lat, lng: loc.lng }}
                                onClick={() => setOpen(loc.id)} >

                            <Pin background={"#ff6b35"} glyphColor={"white"}></Pin>

                        </AdvancedMarker>

                        {
                            open === loc.id && (
                                <InfoWindow position={{ lat: loc.lat, lng: loc.lng }} onCloseClick={() => setOpen(null)}>
                                    <p>{ loc.location }</p>
                                </InfoWindow>
                            )
                        }
                        </div>
                    ))
                }
            </Map>
        </div>
    </APIProvider>
  )
}

export default Location
