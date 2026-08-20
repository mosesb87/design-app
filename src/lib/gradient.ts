export type GradientType = "linear" | "radial";

export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface GradientState {
  type: GradientType;
  angle: number;
  stops: ColorStop[];
}

export function createId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function sortedStops(stops: ColorStop[]): ColorStop[] {
  return [...stops].sort((a, b) => a.position - b.position);
}

/**
 * Build a valid CSS gradient string from the current state.
 * Radial gradients ignore the angle by design.
 */
export function toCss(state: GradientState): string {
  const stopList = sortedStops(state.stops)
    .map((s) => `${s.color} ${Math.round(s.position)}%`)
    .join(", ");

  if (state.type === "radial") {
    return `radial-gradient(circle at center, ${stopList})`;
  }
  return `linear-gradient(${Math.round(state.angle)}deg, ${stopList})`;
}

export function toBackgroundRule(state: GradientState): string {
  return `background: ${toCss(state)};`;
}

const PRESETS: Array<{ name: string; state: Omit<GradientState, "stops"> & { colors: string[] } }> = [
  { name: "Sunset", state: { type: "linear", angle: 135, colors: ["#ff8a00", "#e52e71"] } },
  { name: "Ocean", state: { type: "linear", angle: 120, colors: ["#2193b0", "#6dd5ed"] } },
  { name: "Grape", state: { type: "linear", angle: 160, colors: ["#8e2de2", "#4a00e0"] } },
  { name: "Mint", state: { type: "linear", angle: 90, colors: ["#11998e", "#38ef7d"] } },
  { name: "Aurora", state: { type: "radial", angle: 0, colors: ["#00c6ff", "#0072ff", "#7f00ff"] } },
];

export function presets(): GradientState[] {
  return PRESETS.map(({ state }) => {
    const { colors, ...rest } = state;
    const count = colors.length;
    return {
      ...rest,
      stops: colors.map((color, i) => ({
        id: createId(),
        color,
        position: count === 1 ? 0 : (i / (count - 1)) * 100,
      })),
    };
  });
}

export function presetNames(): string[] {
  return PRESETS.map((p) => p.name);
}
