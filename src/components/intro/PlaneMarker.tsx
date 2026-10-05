import { Plane } from "lucide-react";
import type { Flight } from "./flights";

export function PlaneMarker({ flight }: { flight: Flight }) {
  return (
    <g className="intro-plane" data-flight-plane={flight.id}>
      <g className="intro-plane-symbol">
        <g transform="rotate(45)">
          <Plane x={-10} y={-10} size={20} strokeWidth={1.6} fill="white" />
        </g>
      </g>
    </g>
  );
}
