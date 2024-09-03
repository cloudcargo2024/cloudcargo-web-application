import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function MapAP() {
  return (
    <APIProvider apiKey={"AIzaSyDPFf4C-v_O2MHUX-0azevxBPBF38IBMXE"}>
      <Map
        style={{ width: "700px", height: "500px" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
}
