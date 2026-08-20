import { useMemo, useState } from "react";
import { GradientPreview } from "./components/GradientPreview";
import { StopRow } from "./components/StopRow";
import { CodeBlock } from "./components/CodeBlock";
import {
  createId,
  presetNames,
  presets,
  toBackgroundRule,
  toCss,
  type ColorStop,
  type GradientState,
  type GradientType,
} from "./lib/gradient";

const PRESETS = presets();
const PRESET_NAMES = presetNames();

function App() {
  const [state, setState] = useState<GradientState>(PRESETS[0]);

  const css = useMemo(() => toCss(state), [state]);
  const rule = useMemo(() => toBackgroundRule(state), [state]);

  function updateStop(id: string, patch: Partial<ColorStop>) {
    setState((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }

  function removeStop(id: string) {
    setState((prev) => ({
      ...prev,
      stops: prev.stops.filter((s) => s.id !== id),
    }));
  }

  function addStop() {
    setState((prev) => {
      const last = prev.stops[prev.stops.length - 1];
      const nextPos = Math.min(100, (last?.position ?? 0) + 15);
      return {
        ...prev,
        stops: [
          ...prev.stops,
          { id: createId(), color: "#ffffff", position: nextPos },
        ],
      };
    });
  }

  function setType(type: GradientType) {
    setState((prev) => ({ ...prev, type }));
  }

  return (
    <div className="min-h-full bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 opacity-40" style={{ background: css }} />
      <div className="pointer-events-none fixed inset-0 bg-slate-950/80 backdrop-blur-3xl" />

      <main className="relative mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <img src="/vite.svg" alt="" className="h-9 w-9" />
            <h1 className="text-3xl font-extrabold tracking-tight">Gradient Studio</h1>
          </div>
          <p className="max-w-xl text-white/60">
            Craft, preview, and export beautiful CSS gradients. Adjust color stops, angle, and
            type, then copy production-ready CSS.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="flex flex-col gap-4">
            <GradientPreview state={state} />
            <CodeBlock code={rule} />
          </section>

          <section className="flex flex-col gap-5 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div>
              <p className="mb-2 text-sm font-semibold text-white/70">Presets</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset, i) => (
                  <button
                    key={PRESET_NAMES[i]}
                    type="button"
                    onClick={() => setState(preset)}
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/15 transition hover:ring-violet-400"
                    style={{ background: toCss(preset) }}
                  >
                    <span className="rounded bg-black/40 px-1.5 py-0.5">{PRESET_NAMES[i]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-xl bg-black/30 p-1 ring-1 ring-white/10">
                {(["linear", "radial"] as GradientType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition ${
                      state.type === t ? "bg-violet-500 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {state.type === "linear" && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="angle" className="text-sm font-semibold text-white/70">
                    Angle
                  </label>
                  <span className="text-xs tabular-nums text-white/60">{Math.round(state.angle)}°</span>
                </div>
                <input
                  id="angle"
                  type="range"
                  min={0}
                  max={360}
                  value={state.angle}
                  onChange={(e) => setState((p) => ({ ...p, angle: Number(e.target.value) }))}
                  className="w-full accent-violet-400"
                />
              </div>
            )}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-white/70">Color stops</p>
                <button
                  type="button"
                  onClick={addStop}
                  className="rounded-lg bg-violet-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-violet-400"
                >
                  + Add stop
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {state.stops.map((stop) => (
                  <StopRow
                    key={stop.id}
                    stop={stop}
                    canRemove={state.stops.length > 2}
                    onChange={(patch) => updateStop(stop.id, patch)}
                    onRemove={() => removeStop(stop.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 text-center text-xs text-white/40">
          Built with React, TypeScript, Vite, and Tailwind CSS.
        </footer>
      </main>
    </div>
  );
}

export default App;
