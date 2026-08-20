import type { ColorStop } from "../lib/gradient";

interface Props {
  stop: ColorStop;
  canRemove: boolean;
  onChange: (patch: Partial<ColorStop>) => void;
  onRemove: () => void;
}

export function StopRow({ stop, canRemove, onChange, onRemove }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <input
        type="color"
        aria-label="Stop color"
        value={stop.color}
        onChange={(e) => onChange({ color: e.target.value })}
        className="h-9 w-9 cursor-pointer rounded-lg border-0 bg-transparent p-0"
      />
      <input
        type="text"
        aria-label="Stop hex"
        value={stop.color}
        onChange={(e) => onChange({ color: e.target.value })}
        className="w-24 rounded-lg bg-black/30 px-2 py-1.5 font-mono text-sm text-white outline-none ring-1 ring-white/10 focus:ring-violet-400"
      />
      <div className="flex flex-1 items-center gap-2">
        <input
          type="range"
          aria-label="Stop position"
          min={0}
          max={100}
          value={stop.position}
          onChange={(e) => onChange({ position: Number(e.target.value) })}
          className="w-full accent-violet-400"
        />
        <span className="w-10 text-right text-xs tabular-nums text-white/60">
          {Math.round(stop.position)}%
        </span>
      </div>
      <button
        type="button"
        aria-label="Remove stop"
        disabled={!canRemove}
        onClick={onRemove}
        className="rounded-lg px-2 py-1 text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        ✕
      </button>
    </div>
  );
}
