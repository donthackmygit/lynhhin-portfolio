import { VIETNAM } from "./flights";

export function VietnamTarget() {
  return (
    <g
      className="intro-vietnam"
      transform={`translate(${VIETNAM.x} ${VIETNAM.y})`}
    >
      <circle className="intro-target-pulse" r="9" />
      <circle className="intro-target-pulse intro-target-pulse-second" r="9" />
      <g className="intro-target-marker">
        <circle className="intro-target-halo" r="9" />
        <circle className="intro-target-dot" r="3.8" />
      </g>
      <g className="intro-target-label">
        <rect x="-49" y="18" width="98" height="24" rx="2" fill="white" />
        <text x="0" y="34" textAnchor="middle">
          VIETNAM
        </text>
      </g>
    </g>
  );
}
