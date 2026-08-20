import type { GradientState } from "../lib/gradient";
import { toCss } from "../lib/gradient";

interface Props {
  state: GradientState;
}

export function GradientPreview({ state }: Props) {
  const css = toCss(state);
  return (
    <div
      data-testid="gradient-preview"
      className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl"
      style={{ background: css }}
    >
      <div className="absolute inset-0 flex items-end justify-between p-5">
        <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
          {state.type === "linear" ? `${Math.round(state.angle)}°` : "radial"}
        </span>
        <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
          {state.stops.length} stops
        </span>
      </div>
    </div>
  );
}
