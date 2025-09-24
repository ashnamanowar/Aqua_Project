import React from "react";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

// --- Accurate ARGO-like Data ---
const depthSeries = [
  { depth: 0, salinity: 34.2 },
  { depth: 100, salinity: 34.4 },
  { depth: 300, salinity: 34.6 },
  { depth: 500, salinity: 34.8 },
  { depth: 1000, salinity: 35.0 },
  { depth: 1500, salinity: 35.1 },
  { depth: 2000, salinity: 35.2 },
];

const timeline = [
  { day: "Mar 01", profiles: 3 },
  { day: "Mar 05", profiles: 10 },
  { day: "Mar 10", profiles: 18 },
  { day: "Mar 15", profiles: 27 },
  { day: "Mar 20", profiles: 35 },
  { day: "Mar 25", profiles: 43 },
  { day: "Mar 30", profiles: 52 },
];

const sampleProfiles = [
  { id: "WMO 2902745", lat: "2.1°N", lon: "78.9°E", time: "2023-03-05 06:30Z" },
  { id: "WMO 2903321", lat: "-1.3°S", lon: "86.4°E", time: "2023-03-11 09:22Z" },
  { id: "WMO 2901358", lat: "0.6°N", lon: "73.1°E", time: "2023-03-19 12:44Z" },
  { id: "WMO 2904112", lat: "1.8°N", lon: "62.7°E", time: "2023-03-23 02:05Z" },
];

export default function Index() {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-ocean-bg text-ocean-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-ocean-card/90 border-b border-ocean-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-ocean-accent to-ocean-cyan text-white grid place-items-center shadow-md">
              🌊
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-ocean-text-primary">
                Ocean Data Explorer
              </h1>
              <p className="text-xs text-ocean-text-secondary">AI-powered ARGO insights</p>
            </div>
          </div>
          {hasSubmitted && (
            <div className="hidden md:block text-sm text-ocean-text-secondary">
              Query:{" "}
              <span className="font-semibold text-ocean-text-primary">
                "Show me salinity profiles near the equator in March 2023"
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chat Column */}
        <section className="lg:col-span-4 flex flex-col">
          <div className="rounded-2xl bg-ocean-card shadow-lg border border-ocean-border flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-ocean-border bg-ocean-surface text-sm font-semibold text-ocean-text-primary">
              Chat
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-auto">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[90%] rounded-2xl px-4 py-2 shadow-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-ocean-accent to-ocean-cyan text-white ml-auto"
                      : "bg-ocean-surface text-ocean-text-primary border border-ocean-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              ))}

              {/* Assistant rich summary card */}
              {hasSubmitted && (
                <div className="rounded-xl border border-ocean-border bg-ocean-card p-4 shadow-sm">
                  <p className="text-[13px] text-ocean-text-secondary mb-3 font-medium">Summary</p>
                  <ul className="text-sm space-y-2 list-disc pl-5 text-ocean-text-primary">
                    <li>
                      Spatial filter:{" "}
                      <span className="font-semibold text-ocean-accent">±5° latitude</span> around the
                      Equator
                    </li>
                    <li>
                      Time window:{" "}
                      <span className="font-semibold text-ocean-accent">Mar 1–31, 2023</span>
                    </li>
                    <li>
                      Profiles found: <span className="font-semibold text-ocean-accent">52</span>{" "}
                      across 17 floats
                    </li>
                    <li>Representative profile plotted below</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-ocean-border bg-ocean-surface">
              <div className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about region, time, or variable…"
                  className="flex-1 rounded-xl px-4 py-3 border border-ocean-border bg-white text-ocean-text-primary placeholder:text-ocean-text-muted focus:outline-none focus:ring-2 focus:ring-ocean-accent focus:border-ocean-accent"
                />
                <button
                  onClick={() => {
                    if (!input.trim()) return;
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", text: input },
                    ]);
                    setHasSubmitted(true);
                    setInput("");
                  }}
                  className="rounded-xl px-4 py-3 bg-gradient-to-r from-ocean-accent to-ocean-cyan text-white hover:from-ocean-cyan hover:to-ocean-accent shadow-md transition-all duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* SQL Box */}
          {hasSubmitted && (
            <div className="mt-4 rounded-2xl bg-ocean-deep text-white shadow-lg border border-gray-300">
              <div className="px-4 py-3 border-b border-gray-400 text-xs uppercase tracking-wide text-gray-300">
                Generated SQL (mock)
              </div>
              <pre className="p-4 text-[11px] leading-5 overflow-x-auto text-gray-200 font-mono">
                {`WITH filtered AS (
  SELECT profile_id, time_utc, latitude, longitude
  FROM profiles
  WHERE latitude BETWEEN -5 AND 5
    AND time_utc >= '2023-03-01' AND time_utc < '2023-04-01'
)
SELECT * FROM filtered LIMIT 200;`}
              </pre>
            </div>
          )}
        </section>

        {/* Right Column: Map + Analytics */}
        {hasSubmitted && (
          <section className="lg:col-span-8 space-y-5">
            {/* Map */}
            <div className="relative h-72 rounded-2xl border border-ocean-border bg-ocean-card shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-ocean-border bg-ocean-surface text-sm font-semibold flex items-center justify-between text-ocean-text-primary">
                <span>Interactive Map (mock)</span>
                <span className="text-xs text-ocean-text-secondary">Equator band: ±5°</span>
              </div>
              <div className="relative h-[calc(100%-44px)] bg-gradient-to-br from-sky-100 to-blue-50">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                {[
                  { top: "41%", left: "65%", label: "WMO 2902745" },
                  { top: "54%", left: "58%", label: "WMO 2903321" },
                  { top: "47%", left: "52%", label: "WMO 2901358" },
                  { top: "51%", left: "46%", label: "WMO 2904112" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: p.top, left: p.left }}
                  >
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-ocean-accent to-ocean-cyan shadow-md ring-2 ring-white" />
                    <div className="text-[10px] mt-1 text-ocean-text-primary font-medium bg-white/90 px-1 rounded shadow-sm">
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Profiles", value: 52 },
                { label: "Floats", value: 17 },
                { label: "Avg Salinity (PSU)", value: 35.0 },
                { label: "Depth Max (m)", value: 2000 },
              ].map((k, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-ocean-card border border-ocean-border p-4 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <p className="text-xs text-ocean-text-secondary font-medium">{k.label}</p>
                  <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-ocean-accent to-ocean-cyan bg-clip-text text-transparent">
                    {k.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-ocean-card border border-ocean-border shadow-lg p-5">
                <div className="text-sm font-semibold mb-4 text-ocean-text-primary">
                  Salinity vs Depth (Representative Profile)
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={depthSeries}
                      margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis
                        dataKey="salinity"
                        type="number"
                        domain={[34, 36]}
                        tickFormatter={(v) => v.toFixed(1)}
                        tick={{ fill: 'hsl(var(--ocean-text-secondary))' }}
                        axisLine={{ stroke: 'hsl(var(--ocean-border))' }}
                        label={{
                          value: "Salinity (PSU)",
                          position: "insideBottom",
                          offset: -2,
                          style: { textAnchor: 'middle', fill: 'hsl(var(--ocean-text-primary))' }
                        }}
                      />
                      <YAxis
                        dataKey="depth"
                        type="number"
                        reversed
                        domain={[0, 2000]}
                        tick={{ fill: 'hsl(var(--ocean-text-secondary))' }}
                        axisLine={{ stroke: 'hsl(var(--ocean-border))' }}
                        label={{
                          value: "Depth (m)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: 'middle', fill: 'hsl(var(--ocean-text-primary))' }
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--ocean-card))',
                          border: '1px solid hsl(var(--ocean-border))',
                          borderRadius: '12px',
                          color: 'hsl(var(--ocean-text-primary))',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                        formatter={(v, n) => [
                          v,
                          n === "salinity" ? "Salinity" : "Depth",
                        ]}
                      />
                      <Legend 
                        wrapperStyle={{ color: 'hsl(var(--ocean-text-primary))' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="salinity"
                        dot={{ fill: 'hsl(var(--ocean-accent))', strokeWidth: 2, r: 4 }}
                        strokeWidth={3}
                        name="Salinity"
                        stroke="hsl(var(--ocean-accent))"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-ocean-text-muted mt-3 leading-relaxed">
                  Surface water ~34.2 PSU, deep ocean ~35.2 PSU (Indian Ocean,
                  March 2023).
                </p>
              </div>

              <div className="rounded-2xl bg-ocean-card border border-ocean-border shadow-lg p-5">
                <div className="text-sm font-semibold mb-4 text-ocean-text-primary">
                  Profiles Found in March 2023
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timeline}
                      margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
                    >
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--ocean-accent))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--ocean-cyan))" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: 'hsl(var(--ocean-text-secondary))' }}
                        axisLine={{ stroke: 'hsl(var(--ocean-border))' }}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--ocean-text-secondary))' }}
                        axisLine={{ stroke: 'hsl(var(--ocean-border))' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--ocean-card))',
                          border: '1px solid hsl(var(--ocean-border))',
                          borderRadius: '12px',
                          color: 'hsl(var(--ocean-text-primary))',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="profiles"
                        stroke="hsl(var(--ocean-accent))"
                        fill="url(#g1)"
                        name="Profiles"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-ocean-card border border-ocean-border shadow-lg p-5">
              <div className="text-sm font-semibold mb-4 text-ocean-text-primary">
                Sample Profiles (near Equator · March 2023)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-ocean-text-secondary border-b border-ocean-border">
                      <th className="py-3 font-medium">Profile / Float</th>
                      <th className="font-medium">Latitude</th>
                      <th className="font-medium">Longitude</th>
                      <th className="font-medium">Time (UTC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleProfiles.map((p, i) => (
                      <tr key={i} className="border-t border-ocean-border hover:bg-ocean-surface transition-colors">
                        <td className="py-3 font-semibold text-ocean-accent">{p.id}</td>
                        <td className="text-ocean-text-primary">{p.lat}</td>
                        <td className="text-ocean-text-primary">{p.lon}</td>
                        <td className="text-ocean-text-secondary">{p.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 pb-8">
        <p className="text-[11px] text-ocean-text-muted">
          Mock UI for SIH 2025 – Data values reflect realistic ARGO float
          observations.
        </p>
      </footer>
    </div>
  );
}