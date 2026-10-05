import type { Flight } from "./flights";

export function FlightPath({ flight }: { flight: Flight }) {
  return (
    <>
      <circle
        className="intro-origin"
        cx={flight.origin[0]}
        cy={flight.origin[1]}
        r="2.4"
      />
      <path
        className="intro-flight-path"
        data-flight-path={flight.id}
        d={flight.path}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}
