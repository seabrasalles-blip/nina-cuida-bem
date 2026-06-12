// Nina — uses the official character image as the final asset.
// The `mood` prop is accepted for API compatibility but intentionally ignored:
// the image is a single illustration provided by the user.
import ninaAsset from "@/assets/nina.png.asset.json";

export type NinaMood = "happy" | "wave" | "cheer" | "think";

export function Nina({
  size = 180,
  mood: _mood = "happy",
}: {
  size?: number;
  mood?: NinaMood;
}) {
  return (
    <img
      src={ninaAsset.url}
      alt="Nina"
      width={size}
      height={size}
      draggable={false}
      className="select-none object-contain pointer-events-none drop-shadow-[0_10px_18px_rgba(31,42,68,0.18)]"
      style={{ width: size, height: "auto" }}
    />
  );
}
