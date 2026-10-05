import { FlightPath } from "./FlightPath";
import { PlaneMarker } from "./PlaneMarker";
import { VietnamTarget } from "./VietnamTarget";
import { flights } from "./flights";

export function WorldMap({ mobile = false }: { mobile?: boolean }) {
  const routes = mobile ? flights.filter((flight) => flight.mobile) : flights;

  return (
    <svg
      className={`intro-map intro-map-${mobile ? "mobile" : "desktop"}`}
      viewBox={mobile ? "460 65 530 330" : "0 25 1000 405"}
      aria-hidden="true"
      focusable="false"
    >
      <image href="/maps/world-map.svg" x="0" y="0" width="1000" height="500" />
      {routes.map((flight) => (
        <FlightPath key={flight.id} flight={flight} />
      ))}
      {routes.map((flight) => (
        <PlaneMarker key={flight.id} flight={flight} />
      ))}
      <VietnamTarget />
    </svg>
  );
}
