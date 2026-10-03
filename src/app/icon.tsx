import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#B8403A",
        color: "#fff",
        fontSize: 38,
        fontFamily: "serif",
        fontStyle: "italic",
      }}
    >
      {profile.initials[0]}.
    </div>,
    { ...size },
  );
}
