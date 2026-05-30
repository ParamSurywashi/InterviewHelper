"use client";
import { X, RotateCcw } from "lucide-react";
import { useSidebar, useSettings } from "@/components/providers";
import type { AppSettings } from "@/components/providers";
const COLORS = [
  { k: "indigo", h: "#4669FA", n: "Indigo" },
  { k: "blue", h: "#0ea5e9", n: "Blue" },
  { k: "rose", h: "#f43f5e", n: "Rose" },
  { k: "violet", h: "#7c3aed", n: "Violet" },
  { k: "green", h: "#10b981", n: "Green" },
  { k: "orange", h: "#f97316", n: "Orange" },
  { k: "yellow", h: "#eab308", n: "Yellow" },
  { k: "cyan", h: "#06b6d4", n: "Cyan" },
] as const;
const Sec = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="py-4 border-b border-slate-100 dark:border-slate-700">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
      {title}
    </p>
    {children}
  </div>
);
const Tabs = <T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { v: T; l: string }[];
  onChange: (v: T) => void;
}) => (
  <div className="flex gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
    {options.map((o) => (
      <button
        key={o.v}
        onClick={() => onChange(o.v)}
        className={`flex-1 text-xs py-1.5 rounded-lg font-bold transition-all ${value === o.v ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
        style={value === o.v ? { background: "var(--primary)" } : {}}
      >
        {o.l}
      </button>
    ))}
  </div>
);
export function SettingsPanel() {
  const { settingsOpen, setSettingsOpen } = useSidebar();
  const { settings, update, reset } = useSettings();
  return (
    <>
      {settingsOpen && (
        <div
          className="fixed inset-0 z-[99997] bg-black/30 backdrop-blur-sm"
          onClick={() => setSettingsOpen(false)}
        />
      )}
      <div className={`settings-panel right ${settingsOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Theme Customiser
            </p>
            <p className="text-xs text-slate-400">Personalise your CRM</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={reset}
              className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSettingsOpen(false)}
              className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          <Sec title="Colour Scheme">
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.k}
                  onClick={() => update({ color: c.k as AppSettings["color"] })}
                  title={c.n}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                    settings.color === c.k ? "scale-105" : "border-transparent"
                  }`}
                  style={settings.color === c.k ? { borderColor: c.h } : {}}
                >
                  <div
                    className="w-8 h-8 rounded-full shadow-md"
                    style={{ background: c.h }}
                  />
                  <span className="text-[9px] font-bold text-slate-400">
                    {c.n}
                  </span>
                </button>
              ))}
            </div>
          </Sec>
          <Sec title="Mode">
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "light", l: "Light" },
                { v: "dark", l: "Dark" },
                { v: "semi-dark", l: "Semi" },
              ].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => update({ theme: v as AppSettings["theme"] })}
                  className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${settings.theme === v ? "text-white" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}`}
                  style={
                    settings.theme === v
                      ? {
                          borderColor: "var(--primary)",
                          background: "var(--primary)",
                        }
                      : {}
                  }
                >
                  {l}
                </button>
              ))}
            </div>
          </Sec>
          <Sec title="Sidebar Position">
            <Tabs
              value={settings.sidebarPosition}
              options={[
                { v: "left", l: "Left" },
                { v: "right", l: "Right" },
              ]}
              onChange={(v) => update({ sidebarPosition: v })}
            />
          </Sec>
          <Sec title="Sidebar Color">
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  v: "white",
                  l: "White",
                  bg: "bg-white border border-slate-200",
                },
                { v: "dark", l: "Dark", bg: "bg-slate-900" },
                { v: "gradient", l: "Gradient", bg: "" },
              ].map(({ v, l, bg }) => (
                <button
                  key={v}
                  onClick={() => update({ sidebarColor: v as any })}
                  className={`p-2.5 rounded-xl border-2 transition-all ${settings.sidebarColor === v ? "" : "border-transparent"}`}
                  style={
                    settings.sidebarColor === v
                      ? { borderColor: "var(--primary)" }
                      : {}
                  }
                >
                  <div
                    className={`h-7 rounded-lg mb-1 ${bg}`}
                    style={
                      v === "gradient"
                        ? {
                            background:
                              "linear-gradient(160deg,#1e293b,#0f172a)",
                          }
                        : {}
                    }
                  />
                  <span className="text-[10px] font-bold text-slate-500">
                    {l}
                  </span>
                </button>
              ))}
            </div>
          </Sec>
          <Sec title="Card Skin">
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: "default", l: "Default" },
                { v: "bordered", l: "Bordered" },
              ].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => update({ skin: v as any })}
                  className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${settings.skin === v ? "" : "border-slate-200 dark:border-slate-700"}`}
                  style={
                    settings.skin === v
                      ? {
                          borderColor: "var(--primary)",
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                        }
                      : {}
                  }
                >
                  {l}
                </button>
              ))}
            </div>
          </Sec>
          <Sec title="RTL Mode">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Right-to-Left Layout
              </span>
              <button
                onClick={() => update({ rtl: !settings.rtl })}
                className="w-11 h-6 rounded-full relative transition-all"
                style={{
                  background: settings.rtl ? "var(--primary)" : "#e2e8f0",
                }}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings.rtl ? "left-5" : "left-0.5"}`}
                />
              </button>
            </div>
          </Sec>
        </div>
        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 flex-shrink-0">
          <p className="text-[10px] text-slate-400 text-center">
            Settings auto-saved to localStorage
          </p>
        </div>
      </div>
    </>
  );
}
